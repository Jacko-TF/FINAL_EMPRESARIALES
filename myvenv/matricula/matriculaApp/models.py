from django.db import models
from datetime import date

# Create your models here.
class Estudiante(models.Model):
    nombre = models.CharField(max_length=200)
    apellido = models.CharField(max_length=200)
    fecha_nacimento = models.DateField()
    direccion = models.CharField(max_length=200)
    dni = models.CharField(max_length=8)
    telefono = models.CharField(max_length=9)
    certificado = models.FileField(upload_to='pdfs/')

class Semestre(models.Model):
    nombre = models.CharField(max_length=7)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

class Ciclo(models.Model):
    nombre = models.CharField(max_length=10)
    semestre = models.ForeignKey(Semestre, on_delete=models.CASCADE)

class Departamento(models.Model):
    nombre = models.CharField(max_length=200)

class Carrera(models.Model):
    nombre = models.CharField(max_length=200)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

class Seccion(models.Model):
    nombre = models.CharField(max_length=1)
    ciclo = models.ForeignKey(Ciclo, on_delete=models.CASCADE)

class Curso(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    credito = models.IntegerField()
    cupos = models.IntegerField()
    horas = models.IntegerField()
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE)

class Matricula(models.Model):
    fecha = models.DateField()
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE)

class Pago(models.Model):
    matricula = models.ForeignKey(Matricula, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=6, decimal_places=2)
    estado = models.BooleanField(default=False)
    fecha_creacion = models.DateField(default=date.today)
    fecha_vencimiento = models.DateField()
    fecha_pago = models.DateField()
    penalidad = models.DecimalField(max_digits=6, decimal_places=2)