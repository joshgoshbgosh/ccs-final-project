from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()



class Patient(models.Model):
    Male = "Male"
    Female = "Female"

    GENDER_CHOICES = [
    (Male, "Male"),
    (Female, "Female"),
    ]


    Wheel_Chair = "Wheel_Chair"
    Walker = "Walker"
    Cane = "Cane"

    WALKING_DEVICES = [
    (Wheel_Chair, "Wheel_Chair"),
    (Walker, "Walker"),
    (Cane, "Cane")

    ]

    first_name = models.CharField(max_length=225)
    last_name = models.CharField(max_length=225, null=True)
    address = models.CharField(max_length=225, null=True)
    image = models.ImageField(upload_to='patients/', null=True)
    date_of_birth = models.DateField(max_length=225)
    weight = models.CharField(max_length=225)
    height = models.CharField(max_length=225)
    gender = models.CharField(max_length=225, choices=GENDER_CHOICES)
    food_allergies = models.CharField(max_length=225, null=True, blank=True, default=None)
    medication_allergies = models.CharField(max_length=225, null=True, blank=True, default=None)
    primary_doctor = models.CharField(max_length=225)
    primary_doctor_telephone_number = models.CharField(max_length=225)
    language = models.CharField(max_length=225)
    is_bed_patient = models.BooleanField(default=False)
    needs_walking_device = models.BooleanField(default=False)
    walking_devices = models.CharField(max_length=225, choices=WALKING_DEVICES,null=True, blank=True, default=None)
    surgeries = models.TextField(default=None, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


    def __str__(self):
        return self.last_name + ", " + self.first_name


class Prescription(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="prescriptions")
    brand_name = models.CharField(max_length=225)
    hourly_frequency = models.IntegerField(null=True, blank=True)
    take_as_needed = models.BooleanField(default=False)
    medication_name = models.CharField(max_length=225)
    directions = models.CharField(max_length=225)
    quantity = models.CharField(max_length=225)
    refills = models.CharField(max_length=225)
    pharmacy_number = models.CharField(max_length=225)
    rx = models.CharField(max_length=225)
    prescriber = models.CharField(max_length=225)
    label_image = models.ImageField(upload_to='precription/', null=True)

    def __str__(self):
        return self.medication_name

class Dose(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE, related_name="doses")
    comments = models.TextField(default=None, null=True, blank=True)
    datetime = models.DateTimeField(null=True)

    def __str__(self):
        return self.comments
