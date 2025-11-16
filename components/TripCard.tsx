
import React from 'react';
import { Link } from 'react-router-dom';
import { Trip, User } from '../types';
import { Crown, Users } from 'lucide-react';

interface TripCardProps {
    trip: Trip;
    currentUser: User;
}

const TripCard: React.FC<TripCardProps> = ({ trip, currentUser }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };

    const isOwner = trip.members[0]?.email === currentUser.email;
    const isInvited = !isOwner && trip.members.some(member => member.email === currentUser.email);

    return (
        <Link to={`/app/trip/${trip.id}`} className="block group">
            <div className="relative bg-slate-800 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/20">
                {isOwner && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        플래너
                    </span>
                )}
                {isInvited && (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        초대
                    </span>
                )}
                <img src={trip.coverImage} alt={trip.title} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                    <p className="text-sm text-blue-400 mb-1">{trip.destination}</p>
                    <h3 className="text-lg font-bold text-white mb-2 flex-grow">{trip.title}</h3>
                    <div className="mt-auto">
                        <p className="text-xs text-gray-400">{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                        <div className="flex items-center mt-3 -space-x-2">
                            {trip.members.slice(0, 3).map(member => (
                                <div key={member.email} className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm border-2 border-slate-800">
                                    {member.name.charAt(0)}
                                </div>
                            ))}
                            {trip.members.length > 3 && (
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-gray-300 border-2 border-slate-800">
                                    +{trip.members.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TripCard;
