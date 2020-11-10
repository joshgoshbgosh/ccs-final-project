from rest_framework import generics, permissions

from .models import Prescription, Dose, Patient
from .serializers import PrescriptionSerializer, DoseSerializer, PatientSerializer

# Create your views here.
class PatientListAPIView(generics.ListCreateAPIView):
    # queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Patient.objects.filter(user=user)

class PatientDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PrescriptionListAPIView(generics.ListCreateAPIView):
    # queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = (permissions.IsAuthenticated,)


    def get_queryset(self):
        # user = self.request.user
        # import pdb; pdb.set_trace()
        # kwargs is equal to {'pk': 15}
        patient = self.kwargs.get('pk')
        return Prescription.objects.filter(patient=patient)

class PrescriptionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer

class DoseListAPIView(generics.ListCreateAPIView):
    serializer_class = DoseSerializer
    permission_classes = (permissions.IsAuthenticated,)

class DoseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dose.objects.all()
    serializer_class = PrescriptionSerializer

    def get_querset(self):
        patient = self.kwargs.get('pk')
        return Prescription.objects.filter(patient=patient)
