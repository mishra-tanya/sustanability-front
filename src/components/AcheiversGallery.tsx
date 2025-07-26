import { useEffect, useState } from 'react';
import api from '../services/axios';
import {
  ChevronLeft,
  ChevronRight,
  FiberManualRecord,
  SchoolOutlined,
  EmojiEventsOutlined,
} from '@mui/icons-material';
import { Box, Typography, IconButton, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { ASSET_BASE_URL } from '../services/config';

interface Achiever {
  week_ending: string;
  student_name: string;
  student_school: string;
  student_grade: string;
  school_name: string;
  school_location: string;
  school_logo: string;
}

interface SlideData {
  date: string;
  school: {
    name: string;
    location: string;
    logo: string;
  };
  student: {
    name: string;
    school: string;
    grade: string;
  };
}

export default function AchieversGallery() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<SlideData[]>([]);

  useEffect(() => {
    api.get('/achievers')
      .then(res => {
        const data = res.data.map((item: Achiever) => ({
          date: `Week ending ${new Date(item.week_ending).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
          })}`,
          school: {
            name: item.school_name,
            location: item.school_location,
            logo: item.school_logo,
          },
          student: {
            name: item.student_name,
            school: item.student_school,
            grade: item.student_grade,
          },
        }));
        setSlides(data);
      })
      .catch(err => console.error(err));
  }, []);

  const total = slides.length;
  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrent((prev) => (prev + 1) % total);

  const slide = slides[current] || null;

  if (!slide) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Loading Achievers...
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <Box sx={{ width: '100%', backgroundColor: '#fdfdfd', px: 2, py: 4 }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 500,
            mb: 4,
            color: '#777',
            fontFamily: `'Segoe UI', sans-serif`,
          }}
        >
          {slide.date}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, md: 4 },
            position: 'relative',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {/* Left Arrow */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 10,
              zIndex: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
              boxShadow: 2,
            }}
          >
            <ChevronLeft />
          </IconButton>

          {/* School Card */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card
              sx={{
                flex: 1,
                width: { xs: 300, sm: 300, md: 350 },
                height: 320,
                p: 3,
                textAlign: 'center',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                fontFamily: `'Segoe UI', sans-serif`,
                cursor: 'pointer',
                background: 'linear-gradient(180deg, #ffffff 60%, #e6f0ff 100%)',
                '&:hover .overlay-school': {
                  transform: 'translateY(0%)',
                },
              }}
            >
              <Box
                className="overlay-school"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: '#007BFF',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.4s ease',
                  zIndex: 3,
                  px: 2,
                }}
              >


                {slide.school.logo ? (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 'bold', mb: 2, fontSize: '16px', textAlign: 'center' }}
                    >
                      {slide.school.name}
                    </Typography>
                    <Box
                      component="img"
                      src={`${ASSET_BASE_URL}${slide.school.logo}`}
                      alt={slide.school.name}
                      sx={{
                        width: '90%',
                        objectFit: 'contain',
                        p: 1,
                        borderRadius: 2,
                      }}
                    />
                  </>
                ) : (
                  <>
                   <Typography
                      variant="body1"
                      sx={{ fontWeight: 'bold', mb: 2, fontSize: '16px', textAlign: 'center' }}
                    >
                      {slide.school.location}
                    </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: { xs: '20px', sm: '24px', md: '28px' },
                    }}
                  >
                    {slide.school.name}
                  </Typography>
                  </>
                )}
              </Box>

              <SchoolOutlined sx={{ fontSize: 80, color: '#007BFF', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', fontSize: '17px', mb: 1 }}>
                School of the Week
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', fontSize: '15px', p: 2, mb: 1, fontWeight: 'bold' }}>
                {slide.school.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', fontSize: '15px', mb: 1 }}>
                {slide.school.location}
              </Typography>
              <Box sx={{ height: '5px', width: '100%', backgroundColor: '#007BFF', mt: 2 }} />
            </Card>
          </motion.div>

          {/* Student Card */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card
              sx={{
                flex: 1,
                width: { xs: 300, sm: 300, md: 350 },
                height: 320,
                p: 3,
                textAlign: 'center',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                fontFamily: `'Playfair Display', serif`,
                cursor: 'pointer',
                background: 'linear-gradient(180deg, #fff8e1 60%, #fff2cc 100%)',
                '&:hover .overlay-student': {
                  transform: 'translateY(0%)',
                },
              }}
            >
              <Box
                className="overlay-student"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: '#FFC107',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.4s ease',
                  zIndex: 3,
                  color: '#222',
                  px: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '24px', sm: '30px', md: '34px' },
                    textAlign: 'center',
                  }}
                >
                  {slide.student.name}
                </Typography>
              </Box>

              <EmojiEventsOutlined sx={{ fontSize: 80, color: '#FFC107', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', fontSize: '17px', mb: 1 }}>
                Student of the Week
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#555', fontSize: '15px', fontWeight: 'bold', p: 2 }}
              >
                {slide.student.name}, Grade {slide.student.grade}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', fontSize: '15px' }}>
                {slide.student.school}
              </Typography>
              <Box sx={{ height: '5px', width: '100%', backgroundColor: '#FFC107', mt: 2 }} />
            </Card>
          </motion.div>

          {/* Right Arrow */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 10,
              zIndex: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
              boxShadow: 2,
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        {/* Pagination Dots */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
          {slides.map((_, index) => (
            <FiberManualRecord
              key={index}
              fontSize="small"
              sx={{
                color: index === current ? 'primary.main' : '#ccc',
                cursor: 'pointer',
              }}
              onClick={() => setCurrent(index)}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}
