import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import initialEmployees from './data/Employees.json';

const initialStateEmployees = initialEmployees ;

const store = (set) => ({
    employees:initialStateEmployees,
    addEmployee: (employee) => set(state => ({employees: [...state.employees, employee]}))
})

const useStore = create(devtools(persist(store, {name: 'employees'})));

export default useStore;