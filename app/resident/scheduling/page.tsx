"use client";

import { AlertCircle, Calendar as CalendarIcon, Clock, Plus, Users, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface LeisureArea {
  id: string;
  name: string;
  capacity: number;
  openTime: string;
  closeTime: string;
  currentBookings: number;
}

interface Reservation {
  id: string;
  areaId: string;
  areaName: string;
  date: string;
  startTime: string;
  endTime: string;
  apartment: string;
}

const leisureAreas: LeisureArea[] = [
  { id: '1', name: 'Salão de Festas', capacity: 50, openTime: '08:00', closeTime: '23:00', currentBookings: 2 },
  { id: '2', name: 'Churrasqueira 1', capacity: 15, openTime: '10:00', closeTime: '22:00', currentBookings: 14 }, // Mudei pra 14 pra você ver a tag de "Quase Lotado"
  { id: '3', name: 'Churrasqueira 2', capacity: 15, openTime: '10:00', closeTime: '22:00', currentBookings: 1 },
  { id: '4', name: 'Quadra Esportiva', capacity: 20, openTime: '06:00', closeTime: '22:00', currentBookings: 8 },
  { id: '5', name: 'Piscina', capacity: 30, openTime: '08:00', closeTime: '20:00', currentBookings: 12 }
];

const mockReservations: Reservation[] = [
  {
    id: '1',
    areaId: '2',
    areaName: 'Churrasqueira 1',
    date: '2026-03-20',
    startTime: '12:00',
    endTime: '18:00',
    apartment: '101'
  }
];

const timeSlots = [
  { value: '08:00', label: '08:00' },
  { value: '10:00', label: '10:00' },
  { value: '12:00', label: '12:00' },
  { value: '14:00', label: '14:00' },
  { value: '16:00', label: '16:00' },
  { value: '18:00', label: '18:00' },
  { value: '20:00', label: '20:00' }
];

export default function ReservasLazer() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Usando string pro input de data nativo (YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedArea, setSelectedArea] = useState('1');
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('18:00');

  const handleCreateReservation = () => {
    if (!selectedDate) {
      toast.error('Selecione uma data para a reserva.');
      return;
    }

    const area = leisureAreas.find(a => a.id === selectedArea);
    if (!area) return;

    // A sua regra de negócio de horário
    if (startTime < area.openTime || endTime > area.closeTime) {
      toast.error(`${area.name} funciona apenas de ${area.openTime} às ${area.closeTime}`);
      return;
    }

    if (startTime >= endTime) {
      toast.error('A hora inicial deve ser antes da hora final.');
      return;
    }

    // A sua regra de negócio de capacidade/lotação
    if (area.currentBookings >= area.capacity) {
      toast.error('Capacidade máxima atingida para esta área.');
      return;
    }

    /* TODO: Integração API (POST)
       Aqui você vai mandar os dados pro back-end validar de verdade
       e gravar no banco.
    */

    const newReservation: Reservation = {
      id: String(Date.now()),
      areaId: area.id,
      areaName: area.name,
      date: selectedDate,
      startTime,
      endTime,
      apartment: '101'
    };

    setReservations([...reservations, newReservation]);
    setIsModalOpen(false);
    toast.success('Reserva realizada com sucesso!');
  };

  const getCapacityBadge = (area: LeisureArea) => {
    const percentage = (area.currentBookings / area.capacity) * 100;
    
    if (percentage >= 90) {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">Quase Lotado</span>;
    } else if (percentage >= 60) {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">Moderado</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">Disponível</span>;
  };

  // Pega a data de hoje no formato YYYY-MM-DD pra travar datas passadas no calendário
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            Reservas de Lazer
          </h1>
          <p className="text-gray-500">
            Agende áreas comuns do condomínio para seus eventos.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Nova Reserva
        </button>
      </div>

      {/* Áreas Disponíveis */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Áreas do Condomínio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leisureAreas.map((area) => (
            <div key={area.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900">{area.name}</h3>
                {getCapacityBadge(area)}
              </div>
              
              <div className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4" />
                <span>{area.openTime} às {area.closeTime}</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center text-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Capacidade: {area.capacity}</span>
                </div>
                <span className="font-bold text-gray-900">{area.currentBookings} / {area.capacity}</span>
              </div>

              {area.currentBookings >= area.capacity * 0.9 && (
                <div className="mt-3 flex items-center gap-2 text-xs text-red-600 font-medium bg-red-50 p-2 rounded-md border border-red-100">
                  <AlertCircle className="w-4 h-4" />
                  Lotação máxima próxima.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Minhas Reservas */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Minhas Reservas</h2>
        {reservations.length === 0 ? (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
            Você não possui reservas agendadas no momento.
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-l-4 border-l-blue-500">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{reservation.areaName}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      {/* Tratamento simples pra exibir a data no padrão BR */}
                      {reservation.date.split('-').reverse().join('/')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {reservation.startTime} às {reservation.endTime}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold self-start sm:self-auto">
                  CONFIRMADA
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Reserva */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Agendar Área</h2>
                <p className="text-sm text-gray-500 mt-1">Escolha o espaço, a data e o período.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
              {/* Lado Esquerdo: Área e Horários */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Área de Lazer</label>
                  <select 
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    {leisureAreas.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.name} (Cap: {area.capacity})
                      </option>
                    ))}
                  </select>
                  {/* Dica de horário do local selecionado */}
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1 bg-gray-50 p-2 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    Funcionamento: {leisureAreas.find(a => a.id === selectedArea)?.openTime} às {leisureAreas.find(a => a.id === selectedArea)?.closeTime}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Início</label>
                    <select 
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Término</label>
                    <select 
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    >
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Lado Direito: Calendário (Input nativo) */}
              <div className="flex flex-col justify-between">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Data da Reserva</label>
                  <input 
                    type="date" 
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                  />
                </div>
                
                <button 
                  onClick={handleCreateReservation}
                  className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}