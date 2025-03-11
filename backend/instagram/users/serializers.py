from rest_framework import serializers
from .models import *
from posts.serializers import *


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramUser
        fields = ['username', 'password'] 
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = InstagramUser.objects.create_user(**validated_data)
        return user


class UsersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramUser
        fields = ['pk', 'username', 'image',]


class UserGetSerializer(serializers.ModelSerializer):
    posts = PostGetSerializer(many=True, read_only=True)
    
    class Meta:
        model = InstagramUser
        fields = ['pk', 'username', 'status', 'image', 'posts']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramUser
        fields = ['username', 'status', 'image'] 


class RelationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relations
        fields =  ['follower', 'following']