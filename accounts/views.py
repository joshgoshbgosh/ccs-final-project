from django.contrib.auth import get_user_model
from rest_framework import generics, permissions


from . import models
from . import serializers
# Create your views here.

User = get_user_model()


class UserCreateAPIView(generics.CreateAPIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        import pdb; pdb.set_trace()
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return models.Profile.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
