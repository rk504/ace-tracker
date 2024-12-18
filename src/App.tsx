import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Student } from './types';
import { EditModal } from './components/EditModal';

const COLORS = ['bg-white', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100'];

function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: 'New Student',
      hoursRemaining: 10,
      teacherName: '',
      setNumber: 1,
      lastUpdated: new Date().toISOString().split('T')[0],
      colorIndex: 0
    };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { 
            ...student, 
            ...updates,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : student
    ));
  };

  const handleHoursChange = (student: Student, increase: boolean) => {
    setSelectedStudent(student);
    setModalAction(increase ? 'increase' : 'decrease');
    setIsModalOpen(true);
  };

  const confirmHoursChange = () => {
    if (!selectedStudent) return;
    
    const change = modalAction === 'increase' ? 1 : -1;
    updateStudent(selectedStudent.id, {
      hoursRemaining: Math.max(0, selectedStudent.hoursRemaining + change)
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Set #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className={COLORS[student.colorIndex]}>
                  <td className="px-6 py-4">
                    <input
                      className="bg-transparent"
                      value={student.name}
                      onChange={(e) => updateStudent(student.id, { name: e.target.value })}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleHoursChange(student, false)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      {student.hoursRemaining}
                      <button
                        onClick={() => handleHoursChange(student, true)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      className="bg-transparent"
                      value={student.teacherName}
                      onChange={(e) => updateStudent(student.id, { teacherName: e.target.value })}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      className="bg-transparent w-16"
                      value={student.setNumber}
                      onChange={(e) => updateStudent(student.id, { setNumber: parseInt(e.target.value) || 0 })}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {new Date(student.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={student.colorIndex}
                      onChange={(e) => updateStudent(student.id, { colorIndex: parseInt(e.target.value) })}
                      className="bg-transparent"
                    >
                      <option value={0}>None</option>
                      <option value={1}>Blue</option>
                      <option value={2}>Green</option>
                      <option value={3}>Yellow</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t">
            <button
              onClick={addStudent}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
      
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmHoursChange}
        action={`${modalAction} hours`}
      />
    </div>
  );
}

export default App;