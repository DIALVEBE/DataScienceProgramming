# Sesión 07 · Guía rápida de pipeline para Ciencia de Datos

Esta sesión final es una referencia práctica. Úsala cuando sabes qué quieres hacer, pero no recuerdas el comando exacto.

No busca ser un manual largo. Piensa en ella como un mapa:

```text
Pregunta
-> Cargar
-> Inspeccionar
-> Limpiar
-> Transformar
-> Resumir
-> Visualizar
-> Interpretar
-> Comunicar
```

<div class="callout callout-primary" markdown="1">

**Cómo usar esta página:** busca el paso en el que estás, copia el ejemplo y cambia los nombres de columnas por los nombres reales de tu dataset.

</div>

## El Pipeline Completo

```mermaid
flowchart LR
    A[Pregunta] --> B[Cargar datos]
    B --> C[Inspeccionar]
    C --> D[Limpiar]
    D --> E[Transformar]
    E --> F[Resumir]
    F --> G[Visualizar]
    G --> H[Interpretar]
    H --> I[Comunicar]
```

Antes de escribir código, escribe la pregunta en lenguaje natural:

```text
¿Qué quiero saber?
¿Qué columnas necesito?
¿Qué operación responde la pregunta?
¿Qué gráfica lo explica mejor?
¿Qué puedo concluir y qué no puedo concluir?
```

## Iniciar un Proyecto

Usa `uv` si quieres un proyecto limpio:

```bash
uv init
uv add pandas numpy matplotlib seaborn plotly
uv run python main.py
```

Usa `pip` si trabajas en un entorno que ya está configurado:

```bash
python -m pip install pandas numpy matplotlib seaborn plotly
```

Importaciones que usarás con frecuencia:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
```

## Abrir un Dataset

Empieza siempre mirando los datos. No limpies columnas antes de saber qué contienen.

```python
import pandas as pd

df = pd.read_csv("datos.csv")

print(df.head())
print(df.shape)
print(df.columns)
print(df.info())
print(df.describe())
```

Una primera revisión rápida:

```python
print("Filas y columnas:", df.shape)
print("\nValores faltantes:")
print(df.isna().sum())
print("\nDuplicados:")
print(df.duplicated().sum())
```

## Recetas

<details open>
<summary>1. No recuerdo cómo se llama una columna</summary>

Imprime los nombres exactos antes de adivinar:

```python
print(list(df.columns))
```

Esto evita errores como:

```text
KeyError: 'ventas'
```

Quizás la columna realmente se llama `Sales`, `Total Sales` o `sales_amount`.

</details>

<details>
<summary>2. Seleccionar y filtrar filas</summary>

Seleccionar una columna:

```python
df["ventas"]
```

Seleccionar varias columnas:

```python
df[["fecha", "region", "ventas"]]
```

Filtrar filas:

```python
ventas_altas = df[df["ventas"] > 100000]
```

Filtrar con dos condiciones:

```python
resultado = df[
    (df["region"] == "Centro") &
    (df["ventas"] > 100000)
]
```

Usa `&` para AND, `|` para OR y paréntesis en cada condición.

</details>

<details>
<summary>3. Crear una columna nueva</summary>

Cuando un valor depende de otras columnas, créalo de forma explícita:

```python
df["total"] = df["precio"] * df["cantidad"]
```

También puedes crear una marca sencilla:

```python
df["venta_alta"] = df["total"] > 100000
```

Las columnas nuevas son útiles cuando hacen que la pregunta sea más fácil de responder.

</details>

<details>
<summary>4. Limpiar faltantes y duplicados</summary>

Revisar valores faltantes:

```python
df.isna().sum()
```

Eliminar duplicados:

```python
df = df.drop_duplicates()
```

Completar una columna numérica con la mediana:

```python
mediana = df["precio"].median()
df["precio"] = df["precio"].fillna(mediana)
```

No uses `dropna()` automáticamente. Puede borrar más información de la esperada.

</details>

<details>
<summary>5. Limpiar valores de texto</summary>

Los datos reales suelen tener espacios, diferencias entre mayúsculas/minúsculas o etiquetas inconsistentes:

```python
df["ciudad"] = (
    df["ciudad"]
    .str.strip()
    .str.lower()
    .str.title()
)
```

Usa esto antes de agrupar por columnas de texto. Si no, `Tunja`, `tunja` y ` TUNJA ` podrían contarse como ciudades diferentes.

</details>

<details>
<summary>6. Trabajar con fechas</summary>

Convierte primero la columna:

```python
df["fecha"] = pd.to_datetime(df["fecha"], errors="coerce")
```

Extrae partes útiles:

```python
df["anio"] = df["fecha"].dt.year
df["mes"] = df["fecha"].dt.month
df["nombre_mes"] = df["fecha"].dt.month_name()
```

Para análisis mensual, crea una columna de mes real:

```python
df["mes"] = (
    df["fecha"]
    .dt.to_period("M")
    .dt.to_timestamp()
)
```

</details>

<details>
<summary>7. Agrupar y resumir con groupby</summary>

Piensa en `groupby` así:

```text
Agrupar POR algo y calcular ALGO.
```

Ventas por región:

```python
ventas_region = (
    df.groupby("region", as_index=False)["ventas"]
    .sum()
    .sort_values("ventas", ascending=False)
)
```

Varias medidas al mismo tiempo:

```python
resumen = (
    df.groupby("region", as_index=False)
    .agg(
        ventas_totales=("ventas", "sum"),
        venta_promedio=("ventas", "mean"),
        cantidad=("ventas", "count")
    )
)
```

Siempre imprime el resumen antes de graficarlo.

</details>

<details>
<summary>8. Guardar un resultado limpio</summary>

Guardar todo:

```python
df.to_csv("datos_limpios.csv", index=False)
```

Guardar solo columnas útiles:

```python
resultado = df[["fecha", "region", "categoria", "ventas"]]
resultado.to_csv("resultado.csv", index=False)
```

</details>

## Guía de Gráficas

| Si quieres ver... | Usa esta gráfica |
|---|---|
| Cambio en el tiempo | Línea |
| Comparar categorías | Barras |
| Distribución de una variable numérica | Histograma |
| Relación entre dos variables numéricas | Dispersión |
| Distribución por grupo y valores atípicos | Diagrama de caja |
| Correlación entre columnas numéricas | Mapa de calor |

<details open>
<summary>Línea: cuando el eje X es tiempo</summary>

Úsala para evolución, tendencia o cambio.

```python
ventas_mensuales = (
    df.groupby("mes", as_index=False)["ventas"]
    .sum()
)

fig, ax = plt.subplots(figsize=(9, 4))

ax.plot(
    ventas_mensuales["mes"],
    ventas_mensuales["ventas"],
    marker="o"
)

ax.set_title("Ventas mensuales")
ax.set_xlabel("Mes")
ax.set_ylabel("Ventas")

plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

</details>

<details>
<summary>Barras: cuando comparas grupos</summary>

Úsala para preguntas como: ¿qué región vende más?

```python
ventas_region = (
    df.groupby("region", as_index=False)["ventas"]
    .sum()
    .sort_values("ventas", ascending=False)
)

fig, ax = plt.subplots(figsize=(8, 4))

sns.barplot(
    data=ventas_region,
    x="region",
    y="ventas",
    ax=ax
)

ax.set_title("Ventas por región")
ax.set_xlabel("Región")
ax.set_ylabel("Ventas")

plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

</details>

<details>
<summary>Dispersión: cuando comparas dos variables numéricas</summary>

Úsala para preguntas como: ¿descuentos y ganancias se mueven juntos?

```python
fig, ax = plt.subplots(figsize=(8, 4))

sns.scatterplot(
    data=df,
    x="descuento",
    y="ganancia",
    hue="categoria",
    ax=ax
)

ax.set_title("Descuento vs ganancia")
ax.set_xlabel("Descuento")
ax.set_ylabel("Ganancia")

plt.tight_layout()
plt.show()
```

Recuerda: correlación no significa causalidad.

</details>

<details>
<summary>Plotly: cuando quieres interacción</summary>

Usa Plotly cuando pasar el cursor, hacer zoom o explorar puntos ayude al lector.

```python
fig = px.scatter(
    df,
    x="descuento",
    y="ganancia",
    color="categoria",
    hover_data=["region", "ventas"],
    title="Descuento vs ganancia"
)

fig.show()
```

</details>

## Convertir Código en un Proyecto Pequeño

Cuando el notebook o script empieza a crecer, separa el trabajo en funciones.

```python
import pandas as pd


def cargar_datos(ruta):
    return pd.read_csv(ruta)


def limpiar_datos(df):
    limpio = df.copy()
    limpio = limpio.drop_duplicates()
    return limpio


def ventas_por_region(df):
    return (
        df.groupby("region", as_index=False)["ventas"]
        .sum()
        .sort_values("ventas", ascending=False)
    )


df = cargar_datos("datos.csv")
df = limpiar_datos(df)
resumen = ventas_por_region(df)

print(resumen)
```

Si el proyecto sigue creciendo, una estructura sencilla puede ayudar:

```text
proyecto/
├── data/
│   └── datos.csv
├── src/
│   ├── carga.py
│   ├── limpieza.py
│   ├── analisis.py
│   └── visualizacion.py
├── main.py
└── README.md
```

No empieces con una estructura compleja. Deja que crezca cuando el proyecto la necesite.

## Problemas Frecuentes

<details>
<summary>KeyError: la columna no existe</summary>

```python
print(df.columns)
```

Revisa escritura, espacios, tildes, mayúsculas/minúsculas y si el archivo cargó bien los encabezados.

</details>

<details>
<summary>FileNotFoundError: Python no encuentra el archivo</summary>

```python
from pathlib import Path

print(Path.cwd())

ruta = Path("datos.csv")
print(ruta.exists())
```

El problema suele estar en la carpeta desde donde se está ejecutando el script.

</details>

<details>
<summary>Una columna numérica aparece como object</summary>

```python
df["ventas"] = pd.to_numeric(df["ventas"], errors="coerce")
print(df[df["ventas"].isna()])
```

Revisa las filas que quedaron como valores faltantes. Pueden tener texto, símbolos o separadores.

</details>

<details>
<summary>La gráfica aparece vacía</summary>

```python
print(df.shape)
print(df.head())
print(df[["x", "y"]].head())
```

Puede que un filtro haya dejado cero filas o que la tabla resumen esté vacía.

</details>

## Checklist Final

- ¿Sé qué pregunta estoy respondiendo?
- ¿Revisé `head()`, `shape`, `info()` y `describe()`?
- ¿Revisé valores faltantes y duplicados?
- ¿Las fechas son realmente fechas?
- ¿Las columnas numéricas son realmente numéricas?
- ¿Imprimí la tabla resumen antes de graficarla?
- ¿La gráfica corresponde a la pregunta?
- ¿La gráfica tiene título y ejes claros?
- ¿Escribí una interpretación?
- ¿Evité conclusiones que los datos no permiten sostener?
- ¿El código puede ejecutarse otra vez de arriba abajo?

## Plantilla Final

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Cargar
df = pd.read_csv("datos.csv")

# 2. Inspeccionar
print(df.head())
print(df.shape)
print(df.info())
print(df.describe())

# 3. Revisar calidad
print(df.isna().sum())
print(df.duplicated().sum())

# 4. Limpiar lo necesario
df = df.drop_duplicates()

# 5. Responder una pregunta
resultado = (
    df.groupby("region", as_index=False)["ventas"]
    .sum()
    .sort_values("ventas", ascending=False)
)

print(resultado)

# 6. Visualizar
fig, ax = plt.subplots(figsize=(8, 4))

sns.barplot(
    data=resultado,
    x="region",
    y="ventas",
    ax=ax
)

ax.set_title("Ventas por región")
ax.set_xlabel("Región")
ax.set_ylabel("Ventas")

plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

<div class="final-banner" markdown="1">

No necesitas memorizar cada comando. Recuerda la ruta: preguntar, preparar, analizar, visualizar, interpretar y comunicar.

</div>
