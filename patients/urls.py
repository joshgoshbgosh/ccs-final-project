from django.urls import path


from .views import PatientListAPIView, PatientDetailAPIView, PrescriptionListAPIView, PrescriptionDetailAPIView, DoseListAPIView, DoseDetailAPIView

urlpatterns = [
    path('dose/<int:pk>/', DoseDetailAPIView.as_view(), name='dose_list'),
    path('dose/<int:pk>/', DoseListAPIView.as_view(), name='dose_list'),
    path('prescription/<int:pk>/', PrescriptionDetailAPIView.as_view(), name='prescription_list'),
    path('prescriptions/<int:pk>/', PrescriptionListAPIView.as_view(), name='prescription_list'),
    path('<int:pk>/', PatientDetailAPIView.as_view(), name='patient_list'),
    path('', PatientListAPIView.as_view(), name='patient_list'),

]
