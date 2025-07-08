import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ManageScreen from './Manage';
import '@testing-library/jest-dom';
jest.mock('../Api', () => ({
  getForkState: jest.fn(() => Promise.resolve(true)),
  getHydrationState: jest.fn(() => Promise.resolve(false)),
  getWateringState: jest.fn((id) => Promise.resolve(id % 2 === 0)),
  changeForkState: jest.fn(() => Promise.resolve("OK")),
  changeHydrationState: jest.fn(() => Promise.resolve("OK")),
  changeWateringState: jest.fn(() => Promise.resolve("OK")),
  getSensorsNum: jest.fn(() => Promise.resolve(1)),}));
jest.mock('react-icons/wi', () => ({
  WiStrongWind: () => <span data-testid="icon-fan" />,}));
jest.mock('react-icons/pi', () => ({
  PiSprayBottleFill: () => <span data-testid="icon-spray" />,}));
jest.mock('react-icons/gi', () => ({
  GiPlantWatering: () => <span data-testid="icon-water" />,}));
jest.mock('react', () => {
  const OriginalReact = jest.requireActual('react');
  return {...OriginalReact, useContext: () => ({ extra: true, setExtra: jest.fn() }),};});
describe('ManageScreen Component', () => {
  beforeEach(() => {jest.clearAllMocks();});
  test('должен загрузить количество датчиков и отобразить 1 горшок', async () => {
    render(<ManageScreen />);
    await waitFor(() => {
      expect(screen.getByText(/Статус/i)).toBeInTheDocument();});
    const potElements = screen.getAllByText(/Горшок/i);
    expect(potElements).toHaveLength(1);});
  test('должен отобразить иконки правильно', async () => {
    render(<ManageScreen />);
    await waitFor(() => {
      expect(screen.getByTestId('icon-fan')).toBeInTheDocument();
      expect(screen.getByTestId('icon-spray')).toBeInTheDocument();
      const wateringIcons = screen.getAllByTestId('icon-water');
      expect(wateringIcons).toHaveLength(1);
    });
  });
});