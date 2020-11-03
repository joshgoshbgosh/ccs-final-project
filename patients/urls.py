from django.urls import path


from .views import PatientListAPIView, PatientDetailAPIView

urlpatterns = [
    path('<int:pk>/', PatientDetailAPIView.as_view(), name='patient_list'),
    path('', PatientListAPIView.as_view(), name='patient_list'),
]
