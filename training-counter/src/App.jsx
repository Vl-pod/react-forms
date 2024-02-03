
import './App.css'

import { useState } from 'react';

const MyForm = () => {
	const [date, setDate] = useState('');
	const [distance, setDistance] = useState('');
	const [data, setData] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Проверка наличия даты и дистанции
		if (date.trim() === '' || distance.trim() === '') {
			return;
		}

		// Поиск индекса для сортировки
		const index = data.findIndex(item => new Date(item.date) > new Date(date));

		// Создание нового объекта
		const newData = {
			date,
			distance: parseFloat(distance),
		};

		// Поиск индекса для существующей даты
		const existingIndex = data.findIndex(item => item.date === date);

		// Если индекс не найден, добавляем в конец
		if (index === -1) {
			if (existingIndex === -1) {
				setData([...data, newData]);
			} else {
				// Суммируем значения для существующей даты
				const updatedData = [...data];
				updatedData[existingIndex].distance += newData.distance;
				setData(updatedData);
			}
		} else {
			// Вставляем новые данные в соответствующий индекс
			if (existingIndex === -1) {
				setData([...data.slice(0, index), newData, ...data.slice(index)]);
			} else {
				// Суммируем значения для существующей даты
				const updatedData = [...data];
				updatedData[existingIndex].distance += newData.distance;
				setData(updatedData);
			}
		}

		// Очистка полей формы
		setDate('');
		setDistance('');
	};

	const handleDelete = (index) => {
		const newData = [...data];
		newData.splice(index, 1);
		setData(newData);
	};

	return (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<label>
					Дата (ДД.ММ.ГГ)
					<input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
				</label>
				<label>
					Пройдено км 
					<input type="text" value={distance} onChange={(e) => setDistance(e.target.value)} />
				</label>
				<button type="submit">OK</button>
			</form>

			<table>
				<thead>
					<tr>
						<th>Дата</th>
						<th>Пройдено км</th>
						<th>Удалить</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td>{item.date}</td>
							<td>{item.distance}</td>
							<td >
								<button onClick={() => handleDelete(index)} className='handle-delete'>✘</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MyForm;
