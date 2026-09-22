---
layout: default
title: "Session 5 — Matplotlib and Seaborn"
description: "Static visualization with Matplotlib and Seaborn: figure anatomy, chart choice, customization, grouped data, heatmaps, and responsible interpretation."
lang: en
permalink: /en/session-05/
---

# Data Science Programming — Session 5
## Matplotlib and Seaborn: choose, build, read, and explain charts

This session turns data tables into visual evidence. The goal is not only to draw charts, but to choose the correct chart for the question, control the figure with `fig` and `ax`, and explain what the graph does and does not support.

> **Core idea:** a chart is an analytical argument. It must be readable, honest, reproducible, and connected to a specific question.

```mermaid
flowchart LR
    A[Data question] --> B[Choose the chart]
    B --> C[Build fig and ax]
    C --> D[Style labels and scale]
    D --> E[Read the pattern]
    E --> F[Explain the finding]
```

---

## 1. What we will do

The guided notebook moves from first plots to critical interpretation.

| Part | Focus | Main idea |
|---|---|---|
| 1 | Anscombe's quartet | Similar summary statistics can hide very different patterns. |
| 2 | Figure anatomy | Use `fig, ax = plt.subplots()` to control the figure explicitly. |
| 3 | Five essential charts | Match bars, lines, scatter plots, histograms, and boxplots to questions. |
| 4 | Customization | Add titles, labels, legends, colors, annotations, and readable formatting. |
| 5 | Grouped data | Move from `groupby` summaries to visual comparison. |
| 6 | Seaborn | Use concise statistical graphics on top of Matplotlib. |
| 7 | Full story | Combine chart choice and interpretation into a responsible visual explanation. |

The advanced notebook follows the same topic, but asks you to return and inspect `Figure` and `Axes` objects so plots can be tested with assertions.

---

## 2. Install and import the libraries

The practice uses Matplotlib, Seaborn, pandas, and NumPy.

```python
%pip install matplotlib seaborn pandas numpy --quiet
```

Then import the core tools:

```python
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

print("matplotlib", matplotlib.__version__)
print("seaborn   ", sns.__version__)
print("pandas    ", pd.__version__)
```

In notebooks, run the cells in order. A plotting cell often depends on the dataset, summary table, or function created above it.

---

## 3. Why visualization matters

Anscombe's quartet shows why numerical summaries are not enough. Four datasets can share similar means, standard deviations, correlations, and regression lines while showing different visual structures.

```python
summary = anscombe.groupby("group").agg(
    mean_x=("x", "mean"),
    mean_y=("y", "mean"),
    std_x=("x", "std"),
    std_y=("y", "std"),
)
print(summary.round(2))
```

The lesson is practical: before making a conclusion, look at the data.

```python
fig, axes = plt.subplots(2, 2, figsize=(8, 6), sharex=True, sharey=True)

for ax, (group, data) in zip(axes.ravel(), anscombe.groupby("group")):
    ax.scatter(data["x"], data["y"])
    ax.set_title(f"Group {group}")

fig.suptitle("Anscombe's quartet")
plt.show()
```

---

## 4. Figure anatomy: `fig` and `ax`

Matplotlib separates the full canvas from the plotting area.

| Object | Meaning |
|---|---|
| `Figure` | The complete canvas. It controls size, layout, and saving. |
| `Axes` | One plotting region inside a figure. This is where data is drawn. |
| `Axis` | The X or Y scale inside an `Axes`: limits, ticks, labels, and formatting. |
| `fig, ax = plt.subplots()` | The recommended starting point for one chart. |
| `plt.subplots(2, 2)` | Creates a grid of charts in one figure. |

Prefer explicit `Axes` methods:

```python
fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(meses, ventas, marker="o")
ax.set_title("Monthly sales")
ax.set_xlabel("Month")
ax.set_ylabel("Sales")
plt.show()
```

This style keeps control when the figure has several panels.

---

## 5. Choose the chart from the question

The chart type should come from the analytical question, not from decoration.

| Question | Chart | Method |
|---|---|---|
| How do categories compare? | Bar chart | `ax.bar()` or `sns.barplot()` |
| How does a value change over time? | Line chart | `ax.plot()` or `sns.lineplot()` |
| How are two numeric variables related? | Scatter plot | `ax.scatter()` or `sns.scatterplot()` |
| How is one numeric variable distributed? | Histogram | `ax.hist()` or `sns.histplot()` |
| How do distributions compare by group? | Boxplot | `ax.boxplot()` or `sns.boxplot()` |

```mermaid
flowchart TD
    Q[What is the question?] --> A{Main comparison}
    A -->|Categories| B[Bar chart]
    A -->|Time| C[Line chart]
    A -->|Two numeric variables| D[Scatter plot]
    A -->|One distribution| E[Histogram]
    A -->|Groups and outliers| F[Boxplot]
```

---

## 6. Make the figure readable

A chart is not finished when Python draws it. It needs enough context for another person to read it without guessing.

```python
fig, ax = plt.subplots(figsize=(8, 4.5))
bars = ax.bar(ciudades, ingresos, color="#62f7ff", label="Revenue")

ax.set_title("Revenue by city - first semester 2026")
ax.set_xlabel("City")
ax.set_ylabel("Revenue (COP)")
ax.bar_label(bars, fmt="{:,.0f}", padding=3)
ax.legend()
plt.xticks(rotation=25, ha="right")
plt.tight_layout()
plt.show()
```

Common mistakes:

| Mistake | Correction |
|---|---|
| Calling `bar_label` with the data instead of the bars | Store the result of `ax.bar(...)` and pass that object to `ax.bar_label(...)`. |
| Leaving labels empty | Always name axes and units. |
| Using unreadable ticks | Rotate, shorten, or format tick labels. |
| Adding style before understanding the data | Decide the message first, then refine the presentation. |

---

## 7. From `groupby` to a chart

Many useful charts start with a summary table.

```python
resumen = (
    titanic
    .groupby("pclass", as_index=False)
    .agg(supervivencia=("survived", "mean"))
)

fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(resumen["pclass"], resumen["supervivencia"])
ax.set_title("Survival rate by passenger class")
ax.set_xlabel("Passenger class")
ax.set_ylabel("Survival rate")
plt.show()
```

Read the chart in words:

1. What is being compared?
2. Which group is higher or lower?
3. How large is the difference?
4. What cannot be concluded from this chart alone?

---

## 8. Seaborn for statistical visualization

Seaborn works on top of Matplotlib and reduces repeated code for statistical plots.

```python
fig, ax = plt.subplots(figsize=(7, 4))
sns.boxplot(data=titanic, x="pclass", y="fare", ax=ax)
ax.set_title("Fare distribution by passenger class")
ax.set_xlabel("Passenger class")
ax.set_ylabel("Fare")
plt.show()
```

It is still useful to keep the `Axes` object:

```python
fig, ax = plt.subplots(figsize=(5.5, 4.5))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1, ax=ax)
ax.set_title("Correlation between numeric variables")
plt.show()
```

Column names must be exact. If the DataFrame has `survived`, `Survived` and `survival` are different names.

---

## 9. Visual decision guide

Use this guide when you receive a new dataset and need to decide what to visualize. The goal is not to memorize functions. The goal is to convert a data question into a chart that supports analysis.

```mermaid
flowchart LR
    P[Question] --> V[Variables]
    V --> G[Chart]
    G --> I[Interpretation]
    I --> L[Limit]
```

| Step | What to decide | Useful checks |
|---|---|---|
| Question | What do I want to discover? | Write the question before coding. |
| Variables | Which columns do I need and what type are they? | `df.head()`, `df.info()`, `df.dtypes`, `df.columns` |
| Chart | Which chart answers that question best? | Match chart type to variable types. |
| Interpretation | What do I see, what does it mean, and what can I not conclude? | Use evidence, not guesses. |

<figure class="chart-figure">
  <img src="../../assets/session-05/visual-guide-gallery-en.svg" alt="Matplotlib gallery with histogram, bar chart, scatterplot, boxplot, line chart, and heatmap examples in English.">
  <figcaption>Examples generated with Matplotlib: each chart type answers a different kind of question.</figcaption>
</figure>

### 9.1 Quick chart selector

| I want to analyze... | Variables | Recommended chart |
|---|---|---|
| Distribution of one variable | 1 numeric | Histogram |
| Number of records by category | 1 categorical | Countplot or bars |
| A value across categories | Categorical + numeric | Bar chart |
| Relationship between two variables | Numeric + numeric | Scatterplot |
| Distribution across groups | Categorical + numeric | Boxplot or violinplot |
| Change over time | Time + numeric | Line chart |
| Relationships among many numeric variables | Several numeric variables | Correlation heatmap |

The choice depends on the question, not only on the columns available.

### 9.2 Common chart patterns

Histogram for one numeric distribution:

```python
fig, ax = plt.subplots(figsize=(8, 4))
sns.histplot(data=df, x="age", bins=20, kde=True, ax=ax)
ax.set_title("Age distribution")
ax.set_xlabel("Age (years)")
ax.set_ylabel("Number of records")
plt.show()
```

Bar chart after grouping:

```python
sales_city = (
    df.groupby("city", as_index=False)["sales"]
      .sum()
)

fig, ax = plt.subplots(figsize=(8, 4))
sns.barplot(data=sales_city, x="city", y="sales", ax=ax)
ax.set_title("Total sales by city")
ax.set_xlabel("City")
ax.set_ylabel("Total sales (COP)")
plt.xticks(rotation=45)
plt.show()
```

Scatterplot with a third categorical variable:

```python
fig, ax = plt.subplots(figsize=(8, 4))
sns.scatterplot(
    data=df,
    x="study_hours",
    y="final_score",
    hue="program",
    ax=ax
)
ax.set_title("Study hours and final score by program")
ax.set_xlabel("Study hours per week")
ax.set_ylabel("Final score")
plt.show()
```

Correlation heatmap:

```python
numeric = df.select_dtypes(include="number")
correlations = numeric.corr()

fig, ax = plt.subplots(figsize=(8, 6))
sns.heatmap(correlations, annot=True, vmin=-1, vmax=1, cmap="coolwarm", ax=ax)
ax.set_title("Correlation matrix")
plt.show()
```

### 9.3 What every good chart needs

| Component | Why it matters |
|---|---|
| Descriptive title | Explains what is being shown. |
| X and Y labels | Clarify variables and units. |
| Legend | Explains color, size, or style mappings. |
| Readable scale | Prevents overlapping labels and unreadable values. |
| Adequate size | Avoids hiding patterns. |
| Interpretation | Connects the chart to the analytical question. |

Customize only when the change improves clarity:

```python
fig, ax = plt.subplots(figsize=(10, 5))
sns.set_theme(style="whitegrid")
ax.grid(alpha=0.3)
plt.xticks(rotation=45)
```

### 9.4 Interpreting without overstating

A useful interpretation has three levels:

| Level | Question | Example |
|---|---|---|
| See | What is visible? | Most scores are between 3.0 and 4.2. |
| Meaning | What does that suggest for the question? | The group tends to show medium-to-high performance. |
| Limit | What can I not conclude? | The chart does not identify the causes of those scores. |

Avoid conclusions that are stronger than the chart supports. A scatterplot can suggest association, but it does not prove causality.

### 9.5 When Plotly is useful

Matplotlib and Seaborn create mostly static visualizations. Plotly is useful when interactivity helps the analysis:

| Need | Why Plotly helps |
|---|---|
| Inspect individual points | Hover can show row-level details. |
| Explore dense charts | Zoom and pan help with many observations. |
| Compare categories interactively | Legends can hide or show groups. |
| Add contextual fields | `hover_data` can reveal extra columns. |

Use interactivity when it adds information, not just because it looks different.

### 9.6 Prompt template for AI support

When asking an AI tool for help, provide the analytical decision first:

```text
I have a DataFrame named df.

Relevant columns:
- study_hours: study hours per week.
- final_score: final score from 0 to 5.
- program: academic program.

Question:
Is there a relationship between study hours and final score?

I think a scatterplot is appropriate.

Generate Python code with Seaborn and Matplotlib.
Use fig, ax = plt.subplots().
Include a descriptive title, X label, Y label, units when needed, and a legend if color is used.
Do not modify the original DataFrame.
Then explain what I should observe to interpret the chart.
Do not invent conclusions that cannot be obtained from the data.
```

Before trusting generated code, check `df.columns`, `df.dtypes`, missing values, and whether the chart actually matches the question.

### 9.7 Delivery checklist

Before submitting a visualization, verify:

1. The question is clear.
2. The variables and their types are identified.
3. The chart type matches the question.
4. The chart has title, axis labels, units, and legend when needed.
5. Categories are readable.
6. The written interpretation says what you see, what it means, and what remains uncertain.
7. You do not confuse correlation with causality.
8. The notebook runs without errors and does not accidentally modify the original dataset.

---

## 10. Practice notebooks

Download the version that matches your route:

| Notebook | Use it when... |
|---|---|
| Student Practice | You want the guided route through Anscombe's quartet, `fig` and `ax`, five core charts, Titanic summaries, Seaborn, and interpretation. |
| Advanced Practice | You already handle the basics and want object-oriented Matplotlib challenges with exact contracts, assertions, reusable themes, Pareto charts, and multi-axis panels. |

The advanced notebook is intentionally strict: it asks functions to return `(fig, ax)` so charts can be inspected, reused, saved, and tested.

---

## 11. Before the next session

Prepare five charts for a dataset related to your project or activity.

| Requirement | Minimum expectation |
|---|---|
| Comparison | One bar chart with a clear category comparison. |
| Trend | One line chart if the data has time or ordered stages. |
| Relationship | One scatter plot between two numeric variables. |
| Distribution | One histogram or boxplot. |
| Interpretation | Each chart must include two or three sentences explaining the finding and one limitation. |

---

## 12. Summary

Three rules to keep:

1. Choose the chart from the question.
2. Use `fig, ax = plt.subplots()` when you want control.
3. Interpret the visual pattern without overstating what the chart proves.

Visualization is part of the analysis, not decoration added at the end.
