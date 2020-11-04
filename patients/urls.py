from django.urls import path


from .views import PatientListAPIView, PatientDetailAPIView, PrescriptionListAPIView, PrescriptionDetailAPIView

urlpatterns = [
    path('<int:user>/prescription/<int:pk>/', PrescriptionDetailAPIView.as_view(), name='prescription_list'),
    path('<int:pk>/prescription/', PrescriptionListAPIView.as_view(), name='prescription_list'),
    path('<int:pk>/', PatientDetailAPIView.as_view(), name='patient_list'),
    path('', PatientListAPIView.as_view(), name='patient_list'),

]
