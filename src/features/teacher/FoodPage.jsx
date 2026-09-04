const MEALS = [
  {
    title: 'Завтрак',
    time: '08:30-09:10',
    items: [
      { name: 'Рисовая молочная каша', amount: '300 гр', highlighted: true },
      { name: 'Какао', amount: '200 мл' },
      { name: 'Бутерброд', amount: '100 гр' },
    ],
  },
  {
    title: 'Обед',
    time: '12:10-12:40',
    items: [
      { name: 'Салат из свеклы', amount: '100 гр' },
      { name: 'Бульон с яйцом', amount: '300 мл', highlighted: true },
      { name: 'Биточки из говядины', amount: '100 гр' },
      { name: 'Тушеная капуста', amount: '200 гр' },
      { name: 'Яблочный сок', amount: '200 мл' },
      { name: 'Хлеб', amount: '75 гр' },
    ],
  },
];

export default function FoodPage() {
  return (
    <div className="screen food-page">
      <h1>Еда</h1>
      {MEALS.map((meal, index) => (
        <section key={meal.title} className="meal-section">
          <div className="meal-heading">{meal.title} <span>{meal.time}</span></div>
          <div className={`meal-card ${index === 0 ? 'meal-card-highlighted' : ''}`}>
            {meal.items.map((item) => (
              <div key={item.name} className={`meal-item ${item.highlighted ? 'is-highlighted' : ''}`}>
                <span className="meal-bullet">•</span>
                <span>{item.name} <small>{item.amount}</small></span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
