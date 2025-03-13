from django.urls import path
from .views import *


urlpatterns = [
    path('all/', PostListView.as_view(), name='list'),
    path('<int:pk>/', PostGetView.as_view(), name='post'),
    path('delete/<int:pk>/', PostDeleteView.as_view(), name='post_delete'),
    path('update/<int:pk>/', PostUpdateView.as_view(), name='post_update'),
    path('create/', PostCreateView.as_view(), name='post_create'),
    path('comment/<int:pk>/', CommentDeleteView.as_view(), name='comment'),
    path('<int:pk>/comment/create/', CommentCreateView.as_view(), name='create_comment'),
    path('post_count_likes/<int:pk>/', CountLikesOfPost.as_view()),
    path('comment_count_likes/<int:pk>/', CountLikesOfComment.as_view()),
    path('post_add_or_remove_like/<int:pk>/', PostLikesView.as_view(), name='post_add_or_remove_like'),
    path('comment_add_or_remove_like/<int:pk>/', CommentLikesView.as_view(), name='comment_add_or_remove_like'),
]