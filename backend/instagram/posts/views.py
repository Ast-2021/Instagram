from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *


class PostGetView(APIView):
    """Получение публикации + получение комментариев публикации"""

    def get(self, request, pk):
        post = get_object_or_404(Posts.objects.prefetch_related('comments'), pk=pk)
        post_serializer = PostGetSerializer(post)
        
        return Response(post_serializer.data)


class PostListView(generics.ListAPIView):
    """Получения всех публикаций"""
    queryset = Posts.objects.all()
    serializer_class = PostListSerializer


class PostUpdateView(generics.UpdateAPIView):
    """Обновление публикаций"""
    permission_classes = [IsAuthenticated]
    queryset = Posts.objects.all()
    serializer_class = PostUpdateSerializer


class PostDeleteView(generics.DestroyAPIView):
    """Удаление публикаций"""
    permission_classes = [IsAuthenticated]
    queryset = Posts.objects.all()

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        user = request.user

        if post.author != user:
            return Response({'detail': 'У вас нет прав на удаление этого поста.'}, status=status.HTTP_403_FORBIDDEN)
        
        return super().destroy(request, *args, **kwargs)


class PostCreateView(generics.CreateAPIView):
    """Создание публикаций"""
    permission_classes = [IsAuthenticated]
    queryset = Posts.objects.all()
    serializer_class = PostCreateSerializer

    
class CommentDeleteView(generics.DestroyAPIView):
    """Удаление комментария"""
    permission_classes = [IsAuthenticated]
    queryset = Comments.objects.all()


class CommentCreateView(generics.CreateAPIView):
    """Создание комментариев"""
    permission_classes = [IsAuthenticated]
    queryset = Comments.objects.all()
    serializer_class = CommentsCreateSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({
            'pk': self.kwargs.get('pk')
        })
        return context


class CountLikesOfPost(APIView):
    """Получение количества лайков поста, и 
    количество комментариев у этого поста"""

    def get(self, request, pk):
        post = get_object_or_404(Posts, pk=pk)
        count_likes = PostLikes.objects.filter(post=post).count()

        count_comments = Comments.objects.filter(post=post).count()
        context = {'count_likes': count_likes, 'count_comments': count_comments}
        return JsonResponse(context)


class CountLikesOfComment(APIView):
    """Получение количества лайков на комментарии"""

    def get(self, request, pk):
        comment = get_object_or_404(Comments, pk=pk)
        count = CommentLikes.objects.filter(comment=comment).count()

        context = {'count': count}
        return JsonResponse(context)


class PostLikesView(APIView):
    """Создание и удаление лайков для публикаций"""
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        """Создание лайка"""
        post = get_object_or_404(Posts, pk=pk)
        PostLikes.objects.create(post=post, user=request.user)
        return Response({'message': 'Like added'}, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        """Удаление лайка"""
        try:
            post = Posts.objects.get(pk=pk)
            like = PostLikes.objects.get(post=post, user=request.user)
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Posts.DoesNotExist:
            return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
        except PostLikes.DoesNotExist:
            return Response({'message': 'Like not found'}, status=status.HTTP_404_NOT_FOUND)


class CommentLikesView(APIView):
    """Создание и удаление лайков для комментариев"""
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        """Создание лайка"""
        comment = get_object_or_404(Comments, pk=pk)
        CommentLikes.objects.create(comment=comment, user=request.user)
        return Response(status=status.HTTP_201_CREATED)


    def delete(self, request, pk):
        """Удаление лайка"""
        try:
            comment = Comments.objects.get(pk=pk)
            like = CommentLikes.objects.get(comment=comment, user=request.user)
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comments.DoesNotExist:
            return Response({'message': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
        except CommentLikes.DoesNotExist:
            return Response({'message': 'Like not found'}, status=status.HTTP_404_NOT_FOUND)
