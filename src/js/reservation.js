import { reservations, structures } from './data.js';
import { filterReservations, populateReservationsTable } from './filters.js';
import { updateMetrics } from './metrics.js';

const modal = document.getElementById('reservation-modal');
const form = document.getElementById('reservation-form');
const modalBlock = document.getElementById('reservation-block');
const modalClassroom = document.getElementById('reservation-classroom');
const reservationsList = document.getElementById('reservations-list');

// Fecha o modal
function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  form.reset();
  modalClassroom.innerHTML = '<option value="">Selecione a sala</option>';
  modalClassroom.disabled = true;
  modalClassroom.classList.add('cursor-not-allowed', 'opacity-75');
}

// Abre o modal
function openModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// Popula o select de salas
function changeModalBlock() {
  modalClassroom.innerHTML = '<option value="">Selecione a sala</option>';
  const selectedBlock = structures.find((structure) => structure.block === modalBlock.value);

  if (!selectedBlock) {
    modalClassroom.disabled = true;
    modalClassroom.classList.add('cursor-not-allowed', 'opacity-75');
    return;
  }

  modalClassroom.disabled = false;
  modalClassroom.classList.remove('cursor-not-allowed', 'opacity-75');

  selectedBlock.classrooms.forEach((classroom) => {
    const option = document.createElement('option');
    option.textContent = classroom;
    option.value = classroom;
    modalClassroom.appendChild(option);
  });

}

// Cria uma reserva
function createReservation(event) {
  event.preventDefault();

  const classroom = modalClassroom.value;
  const date = document.getElementById('reservation-date').value;
  const shift = document.getElementById('reservation-shift').value;

  const classroomIsReserved = reservations.some(
    (reservation) =>
      reservation.classroom === classroom &&
      reservation.date === date &&
      reservation.shift === shift,
  );

  if (classroomIsReserved) {
    alert('Essa sala já está reservada nessa data e turno.');
    return;
  }

  reservations.push({
    id: Date.now(),
    applicant: document.getElementById('reservation-applicant').value,
    block: modalBlock.value,
    classroom,
    date,
    shift,
  });

  populateReservationsTable(filterReservations());
  updateMetrics();
  closeModal();
}

// Remove uma reserva
function removeReservation(event) {
  const button = event.target.closest('.remove-reservation');

  if (!button) return;

  const reservationId = Number(button.value);
  const reservationIndex = reservations.findIndex(
    (reservation) => reservation.id === reservationId,
  );

  reservations.splice(reservationIndex, 1);
  populateReservationsTable(filterReservations());
  updateMetrics();
}

// Inicializa o modal de reservas, incluindo valores no select do bloco
export function initializeReservationModal() {
  structures.forEach((structure) => {
    const option = document.createElement('option');
    option.textContent = structure.block;
    option.value = structure.block;
    modalBlock.appendChild(option);
  });

  // Chama as funções conforme seus eventos
  modalBlock.addEventListener('change', changeModalBlock);
  document.getElementById('open-reservation-modal').addEventListener('click', openModal);
  document.getElementById('close-reservation-modal').addEventListener('click', closeModal);
  form.addEventListener('submit', createReservation);
  reservationsList.addEventListener('click', removeReservation);
}
