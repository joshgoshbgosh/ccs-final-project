from django.urls import path


from . import views


urlpatterns = [
    path('profile_create/', views.ProfileListAPIView.as_view()),
]
