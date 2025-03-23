from rest_framework import serializers
from .models import *


class CommentsCreateSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Comments
        fields = ['id', 'text', 'author', 'post', 'username']

    def run_validation(self, data):
        request = self.context.get('request')
        pk = self.context.get('pk')
        if request and hasattr(request, 'user'):
            data = data.copy()
            data['author'] = request.user.id
            data['post'] = pk

        return super().run_validation(data)

    
class CommentsListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    liked_users_pk_list = serializers.SerializerMethodField()

    class Meta:
        model = Comments
        fields = ['id', 'username', 'author', 'text', 'liked_users_pk_list']

    def get_liked_users_pk_list(self, obj):
        return list(CommentLikes.objects.filter(comment=obj).values_list('user__pk', flat=True))


class PostGetSerializer(serializers.ModelSerializer):
    comments = CommentsListSerializer(many=True)
    class Meta:
        model = Posts
        fields = ['image', 'author', 'description', 'comments']


class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['pk', 'image']

    
class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['description']


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['pk', 'image', 'description', 'author']

    def run_validation(self, data): 
        request = self.context.get('request') 
        if request and hasattr(request, 'user'):
            data = data.copy() 
            data['author'] = request.user.pk
        return super().run_validation(data)
    