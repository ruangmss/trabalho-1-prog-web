import { reservations, structures } from './data.js';

const nameFilter = document.getElementById('name_filter');
const dateFilter = document.getElementById('date_filter');
const blockFilter = document.getElementById('block_filter');
const classroomFilter = document.getElementById('classroom_filter');
const reservationsList = document.getElementById('reservations-list');

// Popula o select de bloco
export function populateBlocks() {
  structures.forEach((structure) => {
    const option = document.createElement('option');
    option.textContent = structure.block;
    option.value = structure.block;

    blockFilter.appendChild(option);
  });
}

// Popula o select de sala com base no bloco selecionado
export function populateClassrooms() {
  classroomFilter.innerHTML = '<option value="">Todas as Salas</option>';

  const selectedBlock = structures.find((structure) => structure.block === blockFilter.value);

  if (!selectedBlock) {
    classroomFilter.disabled = true;
    classroomFilter.classList.add('cursor-not-allowed');
    classroomFilter.classList.add('opacity-75');
    return;
  }

  classroomFilter.disabled = false;
  classroomFilter.classList.remove('cursor-not-allowed');
  classroomFilter.classList.remove('opacity-75');

  selectedBlock.classrooms.forEach((classroom) => {
    const option = document.createElement('option');
    option.textContent = classroom;
    option.value = classroom;

    classroomFilter.appendChild(option);
  });
}

export function filterReservations() {
  const filteredReservations = reservations.filter((reservation) => {
    const matchesName = reservation.applicant
      .toLowerCase()
      .includes(nameFilter.value.toLowerCase());
    const matchesDate = !dateFilter.value || reservation.date === dateFilter.value;
    const matchesBlock = !blockFilter.value || reservation.block === blockFilter.value;
    const matchesClassroom =
      !classroomFilter.value || reservation.classroom === classroomFilter.value;

    return matchesName && matchesDate && matchesBlock && matchesClassroom;
  });

  reservationsList.innerHTML = '';

  if (filteredReservations.length === 0) {
    reservationsList.innerHTML = `
      <tr>
        <td colspan="5" class="p-4 text-center text-slate-500">
          Nenhuma reserva encontrada.
        </td>
      </tr>
    `;
    return;
  }

  filteredReservations.forEach((reservation) => {
    const item = document.createElement('tr');
    item.className = 'border-b border-gray-200 last:border-b-0';
    item.innerHTML = `
      <td class="p-4 font-semibold">${reservation.applicant}</td>
      <td class="p-4">${reservation.block}</td>
      <td class="p-4">${reservation.classroom}</td>
      <td class="p-4">${reservation.date}</td>
      <td class="p-4">${reservation.shift}</td>
    `;
    reservationsList.appendChild(item);
  });
}

nameFilter.addEventListener('input', filterReservations);
dateFilter.addEventListener('change', filterReservations);
classroomFilter.addEventListener('change', filterReservations);
blockFilter.addEventListener('change', () => {
  populateClassrooms();
  filterReservations();
});
