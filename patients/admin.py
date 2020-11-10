from django.contrib import admin

from .models import Patient,Prescription,Dose



admin.site.register(Patient)
admin.site.register(Prescription)
admin.site.register(Dose)
