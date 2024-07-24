import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import backo_img from "../../assets/End_img.png";
import favicon from "../../assets/favicon.png";
import './analytics.css'
import { Bar } from 'react-chartjs-2';
import Logout from '../AuthenticationComponent/logout';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'User Count',
      color: 'white',
      font: {
        size: 20
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: 'white',
        font: {
          size: 20
        },
        padding: 30,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: 'white',
        font: {
          size: 15,
        },
      },
      grid: {
        color: 'white',
      },
      axisLineColor: 'white',
    },
    y: {
      stacked: true,
      ticks: {
        color: 'white',
        font: {
          size: 15,
        },
      },
      grid: {
        color: 'white',
      },
      axisLineColor: 'white',
    },
  },
  layout: {
    padding: {
      left: 100,
      bottom: 100,
    },
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
};


const labels = ['Image Generator', 'Speech Generator', 'Convo Generator', 'Memes Generator', 'Video Generator'];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const data = {
  labels,
  datasets: [
    {
      label: 'User Login Count',
      data: labels.map(() => getRandomNumber(0, 1000)),
      backgroundColor: '#bfd4e3',
      barThickness: 50,
    },
    {
      label: 'User Search Count',
      data: labels.map(() => getRandomNumber(0, 1000)),
      backgroundColor: '#506d8a',
      barThickness: 50,
    },
    {
      label: 'User Download Count',
      data: labels.map(() => getRandomNumber(0, 1000)),
      backgroundColor: '#6a89a9',
      barThickness: 50,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
};
export function AnalyticsPage() {
  const navigate = useNavigate();
  const logoutfunction = (value) => {
    navigate(value);
  };
  return (
    <>
      <div className='cardContainer' style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundImage: `url(${backo_img})`,
        width: " 100%",
        height: "105vh",
      }}>
        <div style={{
          display: 'flex', height: 'auto',
          width: 'auto',
          position: 'absolute',
          top: '-17px'
        }}>
          <img src={favicon} alt='logo' style={{ width: '80px', height:'90px' }} />
        </div>
        <Logout logoutfunction={logoutfunction} />
        <div
          class={'glow-on-hover-chart'} >
          <Bar
            class='bar'
            options={options}
            data={data}
          />
        </div>
      </div>
    </>
  );
}
