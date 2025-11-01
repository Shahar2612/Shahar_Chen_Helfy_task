import React, { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';
// display tasks in carousel
const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const totalTasks = tasks.length;
  const [currentIndex, setCurrentIndex] = useState(totalTasks > 0 ? totalTasks : 0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (totalTasks > 0) {
      setCurrentIndex(totalTasks);
    }
  }, [totalTasks]);
// create cloned tasks for seamless infinite loop
  const createInfiniteTasks = (taskList) => {
    if (taskList.length === 0) return [];
    return [...taskList, ...taskList, ...taskList];
  };
// create infinite tasks
  const infiniteTasks = createInfiniteTasks(tasks);

  useEffect(() => {
    if (totalTasks === 0 || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= totalTasks * 2) {
          return totalTasks;
        }
        return next;
      });
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalTasks, isPaused]);

  useEffect(() => {
    if (carouselRef.current && totalTasks > 0) {
      const itemWidth = 100 / 3;
      const translateX = -currentIndex * itemWidth;
      
      if (currentIndex >= totalTasks * 2) {
        carouselRef.current.style.transition = 'none';
        carouselRef.current.style.transform = `translateX(-${totalTasks * itemWidth}%)`;
        setTimeout(() => {
          setCurrentIndex(totalTasks);
        }, 50);
      } else if (currentIndex < 0) {
        carouselRef.current.style.transition = 'none';
        carouselRef.current.style.transform = `translateX(-${(totalTasks * 2 - 1) * itemWidth}%)`;
        setTimeout(() => {
          setCurrentIndex(totalTasks * 2 - 1);
        }, 50);
      } else {
        carouselRef.current.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        carouselRef.current.style.transform = `translateX(${translateX}%)`;
      }
    }
  }, [currentIndex, totalTasks]);
// handle previous button click
  const handlePrev = () => {
    if (totalTasks === 0) return;
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next < 0) {
        return totalTasks * 2 - 1;
      }
      return next;
    });
  };
// handle next button click
  const handleNext = () => {
    if (totalTasks === 0) return;
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= totalTasks * 2) {
        return totalTasks;
      }
      return next;
    });
  };

  if (totalTasks === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="task-list-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button 
        className="carousel-btn carousel-btn-prev"
        onClick={handlePrev}
        aria-label="Previous task"
      >
        ‹
      </button>
      
      <div className="carousel-wrapper">
        <div 
          ref={carouselRef}
          className="carousel-track"
          style={{ transition: 'transform 0.5s ease-in-out' }}
        >
          {infiniteTasks.map((task, index) => (
            <div key={`${task.id}-${index}`} className="carousel-item">
              <TaskItem
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
      </div>

      <button 
        className="carousel-btn carousel-btn-next"
        onClick={handleNext}
        aria-label="Next task"
      >
        ›
      </button>

      <div className="carousel-indicators">
        {tasks.map((_, index) => (
          <button
            key={index}
            className={`indicator ${(currentIndex % totalTasks) === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index + totalTasks)}
            aria-label={`Go to task ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

