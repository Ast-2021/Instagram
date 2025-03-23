from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from users.serializers import PostGetSerializer


class PostGetView(APIView):
    """Получение публикации + получение комментариев публикации"""
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        post = get_object_or_404(Posts.objects.prefetch_related('comments'), pk=pk)
        post_serializer = PostGetSerializer(post, context={"request": request})
        
        return Response(post_serializer.data)


class PostListView(generics.ListAPIView):
    """Получения всех публикаций"""
    queryset = Posts.objects.all()
    serializer_class = PostListSerializer


class PostListUserView(APIView):
    """Получение всех публикаций пользователя"""
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = get_object_or_404(InstagramUser, pk=pk)
        posts = Posts.objects.filter(author=user)
        posts_serializer = PostListSerializer(posts, context={"request": request}, many=True)

        return Response(posts_serializer.data)

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


class LikersOfPost(APIView):
    """Получение пользователей которым понравился пост, и 
    количество комментариев у этого поста"""

    def get(self, request, pk):
        post = get_object_or_404(Posts, pk=pk)
        liked_users_pk_list = list(PostLikes.objects.filter(post=post).values_list('user', flat=True))

        count_comments = Comments.objects.filter(post=post).count()
        context = {'liked_users_pk_list': liked_users_pk_list, 'count_comments': count_comments}
        return JsonResponse(context)


class CountLikesOfComment(APIView):
    """Получение количества лайков на комментарии"""

    def get(self, request, pk):
        comment = get_object_or_404(Comments, pk=pk)
        liked_users_pk_list = list(CommentLikes.objects.filter(comment=comment).values_list('user', flat=True))

        context = {'liked_users_pk_list': liked_users_pk_list}
        return JsonResponse(context)


class PostLikesView(APIView):
    """Создание и удаление лайков для публикаций"""
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        """Создание или удаление лайка"""
        post = get_object_or_404(Posts, pk=pk)
        obj, created = PostLikes.objects.get_or_create(post=post, user=request.user)

        if created:
            return Response({'message': 'Like added'}, status=status.HTTP_201_CREATED)
        else:
            obj.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class CommentLikesView(APIView):
    """Создание и удаление лайков для комментариев"""
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        """Создание лайка"""
        comment = get_object_or_404(Comments, pk=pk)
        obj, created = CommentLikes.objects.get_or_create(comment=comment, user=request.user)
        if created:
            return Response({'message': 'Like added'}, status=status.HTTP_201_CREATED)
        else:
            obj.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)