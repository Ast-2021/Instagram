from rest_framework import serializers
from .models import *


class CommentsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['text', 'author', 'post']

    def run_validation(self, data):
        request = self.context.get('request')
        pk = self.context.get('pk')
        if request and hasattr(request, 'user'):
            data = data.copy()
            data['author'] = request.user.id
            data['post'] = pk

        print(data)
        return super().run_validation(data)


class CommentsListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comments
        fields = ['id', 'username', 'text']


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
        fields = ['image', 'description']