import {
  filterReservations,
  populateBlocks,
  populateClassrooms,
  populateReservationsTable,
} from './filters.js';

populateBlocks();
populateClassrooms();
populateReservationsTable(filterReservations());
