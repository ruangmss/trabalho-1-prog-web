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

// Retorna as reservas que correspondem aos filtros
export function filterReservations() {
  return reservations.filter((reservation) => {
    const matchesName = reservation.applicant
      .toLowerCase()
      .includes(nameFilter.value.toLowerCase());
    const matchesDate = !dateFilter.value || reservation.date === dateFilter.value;
    const matchesBlock = !blockFilter.value || reservation.block === blockFilter.value;
    const matchesClassroom =
      !classroomFilter.value || reservation.classroom === classroomFilter.value;

    return matchesName && matchesDate && matchesBlock && matchesClassroom;
  });
}

// Popula a tabela com as reservas recebidas
export function populateReservationsTable(reservationsToDisplay) {
  reservationsList.innerHTML = '';

  if (reservationsToDisplay.length === 0) {
    reservationsList.innerHTML = `
      <tr>
        <td colspan="6" class="p-4 text-center text-slate-500 max-sm:block">
          Nenhuma reserva encontrada.
        </td>
      </tr>
    `;
    return;
  }

  reservationsToDisplay.forEach((reservation) => {
    const item = document.createElement('tr');
    item.className =
      'border-b border-gray-200 last:border-b-0 max-sm:mb-3 max-sm:block max-sm:rounded-xl max-sm:border-2 max-sm:bg-white';
    item.innerHTML = `
      <td class="p-4 font-semibold max-sm:flex max-sm:justify-between max-sm:gap-4 max-sm:border-b max-sm:p-3 max-sm:text-right">
        <span class="hidden max-sm:block">Solicitante</span>
        ${reservation.applicant}
      </td>
      <td class="p-4 max-sm:flex max-sm:justify-between max-sm:gap-4 max-sm:border-b max-sm:p-3 max-sm:text-right">
        <span class="hidden font-semibold max-sm:block">Bloco</span>
        ${reservation.block}
      </td>
      <td class="p-4 max-sm:flex max-sm:justify-between max-sm:gap-4 max-sm:border-b max-sm:p-3 max-sm:text-right">
        <span class="hidden font-semibold max-sm:block">Sala</span>
        ${reservation.classroom}
      </td>
      <td class="p-4 max-sm:flex max-sm:justify-between max-sm:gap-4 max-sm:border-b max-sm:p-3 max-sm:text-right">
        <span class="hidden font-semibold max-sm:block">Data</span>
        ${reservation.date}
      </td>
      <td class="p-4 max-sm:flex max-sm:justify-between max-sm:gap-4 max-sm:border-b max-sm:p-3 max-sm:text-right">
        <span class="hidden font-semibold max-sm:block">Turno</span>
        ${reservation.shift}
      </td>
      <td class="p-4 max-sm:flex max-sm:items-center max-sm:justify-between max-sm:gap-4 max-sm:p-3">
        <span class="hidden font-semibold max-sm:block">Ação</span>
        <button
          type="button"
          value="${reservation.id}"
          class="remove-reservation cursor-pointer rounded-lg bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700"
        >
          Remover
        </button>
      </td>
    `;
    reservationsList.appendChild(item);
  });
}

// Limpa filtros
function clearFilters() {
  nameFilter.value = '';
  dateFilter.value = '';
  blockFilter.value = '';
  populateClassrooms();
  populateReservationsTable(reservations);
}

// População da tabela de acordo com os eventos
nameFilter.addEventListener('input', () => populateReservationsTable(filterReservations()));
dateFilter.addEventListener('change', () => populateReservationsTable(filterReservations()));
classroomFilter.addEventListener('change', () => populateReservationsTable(filterReservations()));

// População de select de salas e da tabela com base no select do bloco
blockFilter.addEventListener('change', () => {
  populateClassrooms();
  populateReservationsTable(filterReservations());
});

document.getElementById('clear-filters').addEventListener('click', clearFilters);
