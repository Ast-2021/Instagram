from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import InstagramUser
from .serializers import *


class InstagramUserList(generics.ListAPIView):
    """Представление возвращает список всех пользователей"""
    queryset = InstagramUser.objects.all()
    serializer_class = UsersListSerializer


class InstagramUserUpdate(generics.UpdateAPIView):
    """Представление обновляет профиль пользователя"""
    permission_classes = [IsAuthenticated]

    queryset = InstagramUser.objects.all()
    serializer_class = UserUpdateSerializer

    def get_object(self):
        return self.request.user


class InstagramUserCreate(generics.CreateAPIView):
    """Представление создает нового пользователя"""
    queryset = InstagramUser.objects.all()
    serializer_class = UserCreateSerializer


class InstagramUserDelete(generics.DestroyAPIView):
    """Представление удаляет пользователя"""
    permission_classes = [IsAuthenticated]
    queryset = InstagramUser.objects.all()


class InstagramUserGet(APIView):
    """Представление возвращает пользователя по pk"""
    def get(self, request, pk):
        user = InstagramUser.objects.get(pk=pk)
        serializer = UserGetSerializer(user)
        return Response(serializer.data)
    

class RelationsView(APIView):
    """Получение подписчиков и подписок пользователя"""
    def get(self, request, pk):
        user = get_object_or_404(InstagramUser, pk=pk)

        followers = Relations.objects.filter(following=user).select_related('follower')
        following = Relations.objects.filter(follower=user).select_related('following')
        count_followers = followers.count()
        count_following = following.count()

        serializer_followers = RelationsSerializer(followers, many=True)
        serializer_following = RelationsSerializer(following, many=True)

        context = {
            'followers': serializer_followers.data,
            'following': serializer_following.data,
            'count_followers': count_followers,
            'count_following': count_following
        }
        return Response(context)
    

class AddOrRemoveFollowingView(APIView):
    """Представление добавляет подписчика, либо удаляет если он уже был"""
    def post(self, request, pk):
        following = get_object_or_404(InstagramUser, pk=pk)
        
        relation, created = Relations.objects.get_or_create(
                                follower=request.user,
                                following=following
                            )
        if not created:
            relation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'message': 'Success'}, status=status.HTTP_201_CREATED)
