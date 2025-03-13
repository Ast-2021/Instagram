import json
from django.test import TestCase, Client
from django.urls import reverse
from .models import *
from instagram.settings import *


class TestViews(TestCase):
    """Тестирование представлений приложения users"""

    def setUp(self):
        self.client = Client()
        
        self.user_1 = InstagramUser.objects.create_user(username='Anna', password='1234567')

        self.url_users_list = reverse('list')
        self.url_user = reverse('get', args=[self.user_1.pk])
        self.url_user_update = reverse('update', args=[self.user_1.pk])
        self.url_user_delete = reverse('delete', args=[self.user_1.pk])
        self.url_user_create = reverse('create')
        self.url_token = reverse('token')

        self.token = self.client.post(
            self.url_token, data={'username': 'Anna', 'password': '1234567'},
            content_type='application/json'
            ).data
    

    def test_instagram_user_list(self):
        """Тестирование представления которое показывает список всех пользователей"""
        response = self.client.get(self.url_users_list)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['username'], 'Anna')

    
    def test_instagram_user_create(self):
        """Тестирование представления для создания новых пользователей"""
        data = {'username': 'Alex', 'password': '1234567'}
        response = self.client.post(self.url_user_create, data=data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(InstagramUser.objects.count(), 2)

    
    def test_instagram_user_get(self):
        """Тестирование представления которое возвращает данные пользователя"""
        response = self.client.get(self.url_user)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'Anna')


    def test_instagram_user_update(self):
        """Тестирование представления которое обновляет данные пользователя"""
        data = json.dumps({'username': 'Indika'})
        headers = {
            'Authorization': f'Bearer {self.token["access"]}',
            'Content-Type': 'application/json'
        }

        update_response = self.client.patch(
            self.url_user_update,
            data=data,
            headers=headers
        )

        self.assertEqual(update_response.status_code, 200)
        self.assertEqual(InstagramUser.objects.first().username, 'Indika')


    def test_instagram_user_delete(self):
        """Тестирование представления которое удаляет пользователя"""
        headers = {
            'Authorization': f'Bearer {self.token["access"]}',
            'Content-Type': 'application/json'
        }
        delete_response = self.client.delete(self.url_user_delete, headers=headers)

        self.assertEqual(delete_response.status_code, 204)
        self.assertEqual(InstagramUser.objects.count(), 0)