/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import RaceDetail from './pages/RaceDetail';
import Garage from './pages/Garage';
import Season from './pages/Season';
import Teams from './pages/Teams';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendrier" element={<Calendar />} />
        <Route path="/calendrier/:raceId" element={<RaceDetail />} />
        <Route path="/mongarage" element={<Garage />} />
        <Route path="/masaison" element={<Season />} />
        <Route path="/ecuries" element={<Teams />} />
      </Routes>
    </BrowserRouter>
  );
}
