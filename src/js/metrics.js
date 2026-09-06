import { reservations } from './data.js';

// Atualiza as métricas
export function updateMetrics() {
  const today = new Date().toLocaleDateString('en-CA');

  document.getElementById('reservations-total').textContent = reservations.length;

  document.getElementById('today-reservations-total').textContent = reservations.filter(
    (reservation) => reservation.date === today,
  ).length;

  document.getElementById('night-reservations-total').textContent = reservations.filter(
    (reservation) => reservation.shift === 'Noite',
  ).length;
}
