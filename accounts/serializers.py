from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_auth.models import TokenModel
from . import models

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = field = ('id', 'user', 'phone_number')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

    # def perform_create(self, serializer):
    #     import pdb; pdb.set_trace()


# Overriding the default TokenSerializer to return user information
# REST_AUTH_SERIALIZERS is listed in settings.py
class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TokenModel
        fields = ('key', 'user',)
