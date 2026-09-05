import {
  filterReservations,
  populateBlocks,
  populateClassrooms,
  populateReservationsTable,
} from './filters.js';
import { initializeReservationModal } from './reservation.js';

// Orquestração das funções criadas nos arquivos
populateBlocks();
populateClassrooms();
populateReservationsTable(filterReservations());
initializeReservationModal();
