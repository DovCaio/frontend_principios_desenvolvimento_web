"use client";

import { api } from '@/utils/requests/api';
import { AlertCircle, Calendar as CalendarIcon, Clock, Plus, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface LeisureArea {
  id: number;
  name: string;
  capacity: number;
  openTime?: string;
  closeTime?: string;
  currentBookings?: number;
}

interface Reservation {
  id: number;
  leisureAreaId: number;
  areaName?: string;
  startTime: string;
  endTime: string;
}

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
  const [leisureAreas, setLeisureAreas] = useState<LeisureArea[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState(true);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('18:00');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [areasRes, schedRes] = await Promise.all([
        api.get('/leisure-area').catch(() => ({ data: [] })),
        api.get('/scheduling').catch(() => ({ data: [] }))
      ]);

      const areas = areasRes.data.map((area: any) => ({
        ...area,
        openTime: '08:00',
        closeTime: '22:00',
        currentBookings: 0
      }));
      setLeisureAreas(areas);
      
      if (areas.length > 0 && !selectedArea) {
        setSelectedArea(String(areas[0].id));
      }

      setReservations(schedRes.data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar dados de reservas.');
    } finally {
      setIsLoadingAreas(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateReservation = async () => {
    if (!selectedDate) {
      toast.error('Selecione uma data para a reserva.');
      return;
    }

    const area = leisureAreas.find(a => String(a.id) === selectedArea);
    if (!area) return;

    const areaOpen = area.openTime || '08:00';
    const areaClose = area.closeTime || '22:00';

    if (startTime < areaOpen || endTime > areaClose) {
      toast.error(`${area.name} funciona apenas de ${areaOpen} às ${areaClose}`);
      return;
    }

    if (startTime >= endTime) {
      toast.error('A hora inicial deve ser antes da hora final.');
      return;
    }

    setIsSubmitting(true);

    try {
      const startDateTime = new Date(`${selectedDate}T${startTime}:00`).toISOString();
      const endDateTime = new Date(`${selectedDate}T${endTime}:00`).toISOString();

      await api.post('/scheduling', {
        leisureAreaId: Number(selectedArea),
        startTime: startDateTime,
        endTime: endDateTime
      });

      setIsModalOpen(false);
      setSelectedDate('');
      toast.success('Reserva realizada com sucesso!');
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar reserva. Verifique a disponibilidade.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCapacityBadge = (area: LeisureArea) => {
    const capacity = area.capacity || 1;
    const bookings = area.currentBookings || 0;
    const percentage = (bookings / capacity) * 100;
    
    if (percentage >= 90) {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">Quase Lotado</span>;
    } else if (percentage >= 60) {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">Moderado</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">Disponível</span>;
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
      dateStr: date.toLocaleDateString('pt-BR'),
      timeStr: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            Reservas de Lazer
          </h1>
          <p className="text-gray-500 font-medium">
            Agende áreas comuns do condomínio para seus eventos.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-bold shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nova Reserva
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Áreas do Condomínio</h2>
        {isLoadingAreas ? (
          <div className="text-center text-gray-500 py-8 font-medium">Carregando áreas de lazer...</div>
        ) : leisureAreas.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center text-gray-500 font-medium">
            Nenhuma área de lazer cadastrada no sistema.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leisureAreas.map((area) => (
              <div key={area.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-blue-300 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">{area.name}</h3>
                  {getCapacityBadge(area)}
                </div>
                
                <div className="text-sm text-gray-600 flex items-center gap-2 mb-4 font-medium">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{area.openTime} às {area.closeTime}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center text-sm border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>Capacidade máxima</span>
                  </div>
                  <span className="font-bold text-gray-900 text-lg">{area.capacity}</span>
                </div>

                {(area.currentBookings || 0) >= area.capacity * 0.9 && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4" />
                    Lotação máxima próxima.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Minhas Reservas</h2>
        {reservations.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500 font-medium">
            Você não possui reservas agendadas no momento.
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => {
              const start = formatDateTime(reservation.startTime);
              const end = formatDateTime(reservation.endTime);
              
              return (
                <div key={reservation.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {reservation.areaName || `Área ID: ${reservation.leisureAreaId}`}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4 text-blue-500" />
                        {start.dateStr}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-500" />
                        {start.timeStr} às {end.timeStr}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold self-start sm:self-auto tracking-wide">
                    CONFIRMADA
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Agendar Área</h2>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Escolha o espaço, a data e o período desejado.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 bg-white border border-gray-200 hover:border-red-100 hover:bg-red-50 p-2 rounded-full transition-colors shadow-sm">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Área de Lazer</label>
                  <select 
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-gray-900 transition-all"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    {leisureAreas.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.name} (Cap: {area.capacity})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 font-medium mt-2 flex items-center gap-1.5 bg-blue-50 text-blue-700 p-2 rounded-lg border border-blue-100">
                    <Clock className="w-3.5 h-3.5" />
                    Funcionamento: {leisureAreas.find(a => String(a.id) === selectedArea)?.openTime || '08:00'} às {leisureAreas.find(a => String(a.id) === selectedArea)?.closeTime || '22:00'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Início</label>
                    <select 
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-gray-900 transition-all"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Término</label>
                    <select 
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-gray-900 transition-all"
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

              <div className="flex flex-col justify-between bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Data da Reserva</label>
                  <input 
                    type="date" 
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 font-medium shadow-sm transition-all"
                  />
                </div>
                
                <button 
                  onClick={handleCreateReservation}
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="w-5 h-5" />
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