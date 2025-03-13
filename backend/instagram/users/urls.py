from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import *


urlpatterns = [
    path('list/', InstagramUserList.as_view(), name='list'),
    path('update/<int:pk>/', InstagramUserUpdate.as_view(), name='update'),
    path('create/', InstagramUserCreate.as_view(), name='create'),
    path('delete/<int:pk>/', InstagramUserDelete.as_view(), name='delete'),
    path('get/<int:pk>/', InstagramUserGet.as_view(), name='get'),
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('relations/<int:pk>/', RelationsView.as_view(), name='follow'),
    path('add_or_remove_following/<int:pk>/', AddOrRemoveFollowingView.as_view()),
]