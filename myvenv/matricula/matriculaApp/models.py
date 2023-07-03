from django.db import models
from datetime import date

# Create your models here.
class Estudiante(models.Model):
    nombre = models.CharField(max_length=200)
    apellido = models.CharField(max_length=200)
    fecha_nacimiento = models.DateField()
    direccion = models.CharField(max_length=200)
    dni = models.CharField(max_length=8)
    telefono = models.CharField(max_length=9)

    def __str__(self):
        return self.nombre + '-' + self.apellido

class Semestre(models.Model):
    nombre = models.CharField(max_length=7)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    def __str__(self):
        return self.nombre

class Ciclo(models.Model):
    nombre = models.CharField(max_length=10)
    semestre = models.ForeignKey(Semestre, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Departamento(models.Model):
    nombre = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre

class Carrera(models.Model):
    nombre = models.CharField(max_length=200)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Seccion(models.Model):
    nombre = models.CharField(max_length=1)
    cupos = models.PositiveIntegerField()
    ciclo = models.ForeignKey(Ciclo, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Curso(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    credito = models.IntegerField()
    horas = models.IntegerField()
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Matricula(models.Model):
    fecha = models.DateField()
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE)

    def __str__(self):
        return self.estudiante.apellido+'-'+self.seccion.carrera.nombre+'-'+self.seccion.ciclo.nombre+'-'+self.seccion.nombre

class Pago(models.Model):
    matricula = models.OneToOneField(Matricula, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=6, decimal_places=2)
    estado = models.BooleanField(default=False)
    fecha_creacion = models.DateField(default=date.today)
    fecha_vencimiento = models.DateField()
    fecha_pago = models.DateField(null=True, blank=True)

    def __str__(self):
        return str(self.monto)+'-'+str(self.estado)+'-'+self.matricula.estudiante.apellido