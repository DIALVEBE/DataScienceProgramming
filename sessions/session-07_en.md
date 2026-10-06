# Session 07 · Quick Data Science Pipeline Guide

This final session is a practical reference. Use it when you know what you want to do, but you do not remember the exact command.

It is not meant to be a long manual. Think of it as a map:

```text
Question
-> Load
-> Inspect
-> Clean
-> Transform
-> Summarize
-> Visualize
-> Interpret
-> Share
```

<div class="callout callout-primary" markdown="1">

**How to use this page:** find the step you are working on, copy the example, and replace the column names with the real columns from your dataset.

</div>

## The Whole Pipeline

```mermaid
flowchart LR
    A[Question] --> B[Load data]
    B --> C[Inspect]
    C --> D[Clean]
    D --> E[Transform]
    E --> F[Summarize]
    F --> G[Visualize]
    G --> H[Interpret]
    H --> I[Communicate]
```

Before writing code, write the question in plain language:

```text
What do I want to know?
Which columns do I need?
What operation answers the question?
Which chart explains it best?
What can I conclude, and what can I not conclude?
```

## Start a Project

Use `uv` if you want a clean project:

```bash
uv init
uv add pandas numpy matplotlib seaborn plotly
uv run python main.py
```

Use `pip` if you are working in an already configured environment:

```bash
python -m pip install pandas numpy matplotlib seaborn plotly
```

Imports you will use often:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
```

## Open a Dataset

Always start by looking at the data. Do not clean columns before you know what they contain.

```python
import pandas as pd

df = pd.read_csv("datos.csv")

print(df.head())
print(df.shape)
print(df.columns)
print(df.info())
print(df.describe())
```

A quick first check:

```python
print("Rows and columns:", df.shape)
print("\nMissing values:")
print(df.isna().sum())
print("\nDuplicates:")
print(df.duplicated().sum())
```

## Recipes

<details open>
<summary>1. I do not remember a column name</summary>

Print the exact names before guessing:

```python
print(list(df.columns))
```

This avoids errors like:

```text
KeyError: 'ventas'
```

Maybe the column is really called `Sales`, `Total Sales`, or `sales_amount`.

</details>

<details>
<summary>2. Select and filter rows</summary>

Select one column:

```python
df["ventas"]
```

Select several columns:

```python
df[["fecha", "region", "ventas"]]
```

Filter rows:

```python
ventas_altas = df[df["ventas"] > 100000]
```

Filter with two conditions:

```python
resultado = df[
    (df["region"] == "Centro") &
    (df["ventas"] > 100000)
]
```

Use `&` for AND, `|` for OR, and parentheses around each condition.

</details>

<details>
<summary>3. Create a new column</summary>

When a value depends on other columns, create it explicitly:

```python
df["total"] = df["precio"] * df["cantidad"]
```

You can also create a simple flag:

```python
df["venta_alta"] = df["total"] > 100000
```

New columns are useful when they make the question easier to answer.

</details>

<details>
<summary>4. Clean missing values and duplicates</summary>

Check missing values:

```python
df.isna().sum()
```

Drop duplicates:

```python
df = df.drop_duplicates()
```

Fill a numeric column with the median:

```python
mediana = df["precio"].median()
df["precio"] = df["precio"].fillna(mediana)
```

Do not use `dropna()` automatically. It may delete more information than you expected.

</details>

<details>
<summary>5. Clean text values</summary>

Real data often has spaces, uppercase/lowercase differences, or inconsistent labels:

```python
df["ciudad"] = (
    df["ciudad"]
    .str.strip()
    .str.lower()
    .str.title()
)
```

Use this before grouping by text columns. Otherwise, `Tunja`, `tunja`, and ` TUNJA ` may be counted as different cities.

</details>

<details>
<summary>6. Work with dates</summary>

Convert the column first:

```python
df["fecha"] = pd.to_datetime(df["fecha"], errors="coerce")
```

Extract useful pieces:

```python
df["anio"] = df["fecha"].dt.year
df["mes"] = df["fecha"].dt.month
df["nombre_mes"] = df["fecha"].dt.month_name()
```

For monthly analysis, create a real month column:

```python
df["mes"] = (
    df["fecha"]
    .dt.to_period("M")
    .dt.to_timestamp()
)
```

</details>

<details>
<summary>7. Group and summarize with groupby</summary>

Think of `groupby` like this:

```text
Group BY something and calculate SOMETHING.
```

Sales by region:

```python
ventas_region = (
    df.groupby("region", as_index=False)["ventas"]
    .sum()
    .sort_values("ventas", ascending=False)
)
```

Several measures at once:

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

Always print the summary before graphing it.

</details>

<details>
<summary>8. Save a clean result</summary>

Save everything:

```python
df.to_csv("datos_limpios.csv", index=False)
```

Save only useful columns:

```python
resultado = df[["fecha", "region", "categoria", "ventas"]]
resultado.to_csv("resultado.csv", index=False)
```

</details>

## Chart Guide

| If you want to see... | Use this chart |
|---|---|
| Change over time | Line |
| Compare categories | Bar |
| Distribution of one numeric variable | Histogram |
| Relationship between two numeric variables | Scatter |
| Distribution by group and outliers | Box plot |
| Correlation between numeric columns | Heatmap |

<details open>
<summary>Line chart: when the X axis is time</summary>

Use it for evolution, trend, or change.

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

ax.set_title("Monthly sales")
ax.set_xlabel("Month")
ax.set_ylabel("Sales")

plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

</details>

<details>
<summary>Bar chart: when you compare groups</summary>

Use it for questions like: which region sells more?

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

ax.set_title("Sales by region")
ax.set_xlabel("Region")
ax.set_ylabel("Sales")

plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

</details>

<details>
<summary>Scatter plot: when you compare two numeric variables</summary>

Use it for questions like: do discounts and profit move together?

```python
fig, ax = plt.subplots(figsize=(8, 4))

sns.scatterplot(
    data=df,
    x="descuento",
    y="ganancia",
    hue="categoria",
    ax=ax
)

ax.set_title("Discount vs profit")
ax.set_xlabel("Discount")
ax.set_ylabel("Profit")

plt.tight_layout()
plt.show()
```

Remember: correlation is not causation.

</details>

<details>
<summary>Plotly: when you want interaction</summary>

Use Plotly when hovering, zooming, or exploring points helps the reader.

```python
fig = px.scatter(
    df,
    x="descuento",
    y="ganancia",
    color="categoria",
    hover_data=["region", "ventas"],
    title="Discount vs profit"
)

fig.show()
```

</details>

## Turn Code into a Small Project

When the notebook or script starts getting long, split the work into functions.

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

If the project keeps growing, a simple structure can help:

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

Do not start with a complex structure. Let the structure grow when the project needs it.

## Common Problems

<details>
<summary>KeyError: the column does not exist</summary>

```python
print(df.columns)
```

Check spelling, spaces, accents, uppercase/lowercase, and whether the file loaded the header correctly.

</details>

<details>
<summary>FileNotFoundError: Python cannot find the file</summary>

```python
from pathlib import Path

print(Path.cwd())

ruta = Path("datos.csv")
print(ruta.exists())
```

The problem is often the folder where the script is being executed.

</details>

<details>
<summary>A number column appears as object</summary>

```python
df["ventas"] = pd.to_numeric(df["ventas"], errors="coerce")
print(df[df["ventas"].isna()])
```

Review the rows that became missing values. They may contain text, symbols, or separators.

</details>

<details>
<summary>The chart is empty</summary>

```python
print(df.shape)
print(df.head())
print(df[["x", "y"]].head())
```

A filter may have left zero rows, or the summary table may be empty.

</details>

## Final Checklist

- Do I know the question I am answering?
- Did I inspect `head()`, `shape`, `info()`, and `describe()`?
- Did I check missing values and duplicates?
- Are dates really dates?
- Are numeric columns really numeric?
- Did I print the summary table before graphing it?
- Does the chart match the question?
- Does the chart have a clear title and labels?
- Did I write an interpretation?
- Did I avoid conclusions that the data cannot support?
- Can the code run again from top to bottom?

## Final Template

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Load
df = pd.read_csv("datos.csv")

# 2. Inspect
print(df.head())
print(df.shape)
print(df.info())
print(df.describe())

# 3. Check quality
print(df.isna().sum())
print(df.duplicated().sum())

# 4. Clean what is necessary
df = df.drop_duplicates()

# 5. Answer one question
resultado = (
    df.groupby("region", as_index=False)["ventas"]
    .sum()
    .sort_values("ventas", ascending=False)
)

print(resultado)

# 6. Visualize
fig, ax = plt.subplots(figsize=(8, 4))

sns.barplot(
    data=resultado,
    x="region",
    y="ventas",
    ax=ax
)

ax.set_title("Sales by region")
ax.set_xlabel("Region")
ax.set_ylabel("Sales")

plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

<div class="final-banner" markdown="1">

You do not need to memorize every command. Remember the path: ask, prepare, analyze, visualize, interpret, and communicate.

</div>
