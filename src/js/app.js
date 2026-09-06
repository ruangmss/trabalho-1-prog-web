import {
  filterReservations,
  populateBlocks,
  populateClassrooms,
  populateReservationsTable,
} from './filters.js';
import { initializeReservationModal } from './reservation.js';
import { updateMetrics } from './metrics.js';

// Orquestração das funções criadas nos arquivos
populateBlocks();
populateClassrooms();
populateReservationsTable(filterReservations());
initializeReservationModal();
updateMetrics();
