
import React, { useState } from 'react';
import { MOCK_TRIPS, MOCK_USER } from '../constants';
import { Plane, Plus } from 'lucide-react';
import TripCard from '../components/trip/TripCard';
import CreateTripModal from '../components/trip/CreateTripModal';
import { Trip, ItineraryDay } from '../types';

interface NewTripData {
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    coverImage: string;
}

const MyTrips: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateTrip = () => {
        setIsModalOpen(true);
    };
    
    const handleAddTrip = (newTripData: NewTripData) => {
        const newItinerary: ItineraryDay[] = [];
        const start = new Date(newTripData.startDate);
        const end = new Date(newTripData.endDate);

        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start <= end) {
            let current = new Date(start);
            while (current <= end) {
                newItinerary.push({
                    date: current.toISOString().split('T')[0],
                    items: [],
                });
                current.setDate(current.getDate() + 1);
            }
        }

        const newTrip: Trip = {
            id: String(Date.now()),
            title: newTripData.title,
            destination: newTripData.destination,
            startDate: newTripData.startDate,
            endDate: newTripData.endDate,
            coverImage: newTripData.coverImage || `https://picsum.photos/seed/${encodeURIComponent(newTripData.title)}/800/600`,
            members: [MOCK_USER],
            itinerary: newItinerary,
            isPublic: false,
            comments: [],
        };
        setTrips(prevTrips => [newTrip, ...prevTrips]);
        setIsModalOpen(false);
    };

    return (
        <>
            <CreateTripModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTrip={handleAddTrip}
            />
            <div className="max-w-[1100px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">내 여행</h1>
                        <p className="text-gray-400 mt-1">다가올 여행을 계획하고 관리하세요</p>
                    </div>
                    <button 
                        onClick={handleCreateTrip}
                        className="flex items-center justify-center mt-4 md:mt-0 w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-all duration-200 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                        <Plus className="w-5 h-5 mr-2" />
                        새 여행 만들기
                    </button>
                </div>

                {trips.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center mt-20">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <Plane className="w-12 h-12 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">아직 여행이 없습니다</h2>
                        <p className="text-gray-400 mb-8">첫 번째 여행을 만들고 멋진 추억을 계획해보세요</p>
                        <button 
                            onClick={handleCreateTrip}
                            className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-all duration-200 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                            <Plus className="w-5 h-5 mr-2" />
                            새 여행 만들기
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {trips.map(trip => (
                            <TripCard key={trip.id} trip={trip} currentUser={MOCK_USER} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyTrips;
