import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./assets/style/app/app.css";
import CountUp from "./components/CountUp";
import { Link } from "react-router-dom";
import AnimatedContent from "./components/AnimatedContent";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import images
import img1 from "./assets/images/herobanner__front__1.webp";
import img2 from "./assets/images/herobanner__front__2.webp";
import img3 from "./assets/images/herobanner__front__3.webp";
import video_img from "./assets/images/video__3.webp";
import market_growth from "./assets/images/market_growth.webp";
import paperwork from "./assets/images/paperwork.jpg";
// Import videos
import heroVideo from "./assets/videos/herobanner_full.mp4";
import sharek from "./assets/videos/sharek.mp4";
import feasibility_studies from "./assets/videos/feasibility_studies.mp4";
import administrational_consultations from "./assets/videos/administrational_consultations.mp4";
import files_management from "./assets/videos/files_management.mp4";
import { motion } from "framer-motion";
import axios from "axios";
function App() {
  const [aboutCards, setAboutCards] = useState([]);

  const [selectedFont, setSelectedFont] = useState("arabic_bold_1");
  useEffect(() => {
    // Fetch latest saved font from server
    const fetchFont = async () => {
      try {
        const res = await axios.get(
          "https://jadwa-study-backend.netlify.app/.netlify/functions/app/fonts/latest"
        );
        const { fontFamily, fontStyles } = res.data;
        setSelectedFont(fontFamily);
        document.documentElement.style.setProperty(
          "--arabic-fm-r",
          fontStyles.regular
        );
        document.documentElement.style.setProperty(
          "--arabic-fm-b",
          fontStyles.bold
        );
        document.documentElement.style.setProperty(
          "--arabic-fm-exb",
          fontStyles.extraBold
        );
      } catch (err) {
        console.error("Error fetching font:", err.message);
      }
    };

    fetchFont();
  }, []);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const arrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000000"
    >
      <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
    </svg>
  );
  const playVideo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#EA3323"
    >
      <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
    </svg>
  );
  const fetchAboutByCategory = async () => {
    try {
      const response = await axios.get(
        `https://jadwa-study-backend.netlify.app/.netlify/functions/app/question`
      );
      return response.data; // expecting array of about cards
    } catch (err) {
      console.error("Failed to fetch about data:", err);
      return [];
    }
  };
  useEffect(() => {
    fetchAboutByCategory().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // Normalize to keep imgUrl as img and no imgFile
        const normalized = data.map((item) => ({
          ...item,
        }));
        setAboutCards(normalized);
      }
    });
  }, []);

  useEffect(() => {
    const video = document.getElementById("hero-video");
    if (video) {
      video.play().catch((err) => {
        console.warn("Autoplay failed:", err);
      });
    }
  }, []);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setIsVideoVisible(true);

    // Wait a moment to ensure video is ready
    setTimeout(() => {
      videoRef.current?.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    }, 100);
  };

  const closeVideo = () => {
    videoRef.current?.pause();
    setIsVideoVisible(false);
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };
  return (
    <motion.div
      className="container"
      dir="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <main className="hero">
        <Swiper
          dir="rtl"
          rewind={true}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          speed={1500}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="swipe-image">
              <AnimatedContent delay={0.2} duration={1.2}>
                <div className="text">
                  <h2>أطلق إمكانيات شركتك بأفضل الحلول الإدارية</h2>
                  <p>
                    متخصصون في الإستشارات الإدارية لجميع المشاريع داخل دول مجلس
                    التعاون الخليجي
                  </p>
                  {/* <Link to={""}>اطلب الخدمة</Link>*/}
                </div>
              </AnimatedContent>
              <div className="img">
                <img src={img1} alt="" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swipe-image">
              <div className="text">
                <h2>لأن نجاح شركتك يبدأ بقرارات مدروسة</h2>
                <p>
                  متخصصون في الإستشارات الإدارية لجميع المشاريع داخل دول مجلس
                  التعاون الخليجي
                </p>
                {/* <Link to={""}>اطلب الخدمة</Link> */}
              </div>
              <div className="img">
                <img src={img2} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swipe-image">
              <div className="text">
                <h2>إضمن الآن أفضل قرار استثماري لشركتك</h2>
                <p>
                  متخصصون في الإستشارات الإدارية لجميع المشاريع داخل دول مجلس
                  التعاون الخليجي
                </p>
                {/* <Link to={""}>اطلب الخدمة</Link> */}
              </div>
              <div className="img">
                <img src={img3} alt="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="bg-video">
          <video id="hero-video" autoPlay loop muted playsInline>
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </main>
      <section>
        <header className="section-header">
          <h1>نحن نقدم إستشارات إدارية ودراسات جدوى</h1>
          <p>
            بدأنا في 2010 ومستمرين في تقديم خدماتنا المميزة بافضل الأسعار في دول
            مجلس التعاون الخليجي
          </p>
        </header>
        <AnimatedContent delay={0.2} duration={1.2}>
          <Link to={"/feasibility-studies"} className="card">
            <div className="card-video">
              <video autoPlay={true} loop muted playsInline controls={false}>
                <source src={feasibility_studies} />
              </video>
            </div>
            <div className="text">
              <h1>دراسات الجدوى</h1>
              <p>نقدم خدمات دراسات الجدوى لجميع المشروعات داخل الخليج</p>
            </div>
          </Link>
        </AnimatedContent>
        <AnimatedContent delay={0.2} duration={1.2}>
          <Link to={"/Administrational-consultations"} className="card">
            <div className="card-video">
              <video autoPlay={true} loop muted playsInline controls={false}>
                <source src={administrational_consultations} />
              </video>
            </div>
            <div className="text">
              <h1>إستشارات إدارية</h1>
              <p>نقوم بإدارة الملفات الخاصة بجميع المعاملات داخل الخليج</p>
            </div>
          </Link>
        </AnimatedContent>
        <AnimatedContent delay={0.2} duration={1.2}>
          <Link to={"/files-management"} className="card">
            <div className="card-video">
              <video autoPlay={true} loop muted playsInline controls={false}>
                <source src={files_management} />
              </video>
            </div>
            <div className="text">
              <h1>إدارة الملفات</h1>
              <p>نقوم بإدارة الملفات الخاصة بجميع المعاملات داخل الخليج</p>
            </div>
          </Link>
        </AnimatedContent>
        <AnimatedContent delay={0.2} duration={1.2}>
          <div className="thoumbnail">
            <img src={video_img} alt="" />
            <div className="playbutton" to="#" onClick={handlePlayClick}>
              <span>{playVideo}</span>
            </div>
          </div>
        </AnimatedContent>
        {isVideoVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 99999999,
            }}
            onClick={closeVideo}
          >
            <video
              ref={videoRef}
              // autoPlay
              controls
              // muted
              // playsInline
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            >
              <source src={sharek} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Close button */}
            <button
              onClick={closeVideo}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "0rem",
                fontSize: "2rem",
                background: "none",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>
        )}
      </section>
      <div className="count">
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="numbers">
            <span>
              <CountUp from={0} to={1150} duration={2} />+
            </span>
            <p>دراسات الجدوى</p>
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="market_growth">
            <img src={market_growth} alt="" />
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="numbers">
            <span>
              <CountUp from={0} to={28} duration={2} />+
            </span>
            <p>استشاري مميز</p>
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="market_growth">
            <img src={market_growth} alt="" />
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="numbers">
            <span>
              <CountUp from={0} to={180} duration={2} />+
            </span>
            <p>خدمات استشارية</p>
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="market_growth">
            <img src={market_growth} alt="" />
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="numbers">
            <span>
              <CountUp from={0} to={500} duration={2} />+
            </span>
            <p>إستشارات إدارية دورية</p>
          </div>
        </AnimatedContent>
      </div>
      <div className="feedback">
        <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
          <header className="feedback-header">
            <span>آراء العملاء</span>
            <h3>شبكتنا مليئة بالعملاء ذو التجارب الناجحة</h3>
          </header>
        </AnimatedContent>
        <Swiper
          dir="rtl"
          rewind={true}
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={1} // 👈 default for mobile
          breakpoints={{
            768: {
              slidesPerView: 3, // 👈 from 768px and up (desktop/tablet)
            },
          }}
          // autoplay={{
          //   delay: 4500,
          //   disableOnInteraction: false,
          // }}
          speed={1500}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          className="feedbackSwiper"
        >
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “ما نستطيع قوله بشأن ادارة شركة شارِك في اختيار فريق عمل
                  متكامل حقق لي العديد من الخدمات والإستشارات وعدد ٢ دراسة جدوى
                  لمشروعات خاصة بي حقا ما يميز هذه الشركة هو قدرتهم على الادارة
                  المتميزة التي حققت المعادلة بين الأسعار المناسبة والجودة
                  المطلوبة. شكرا لكم”
                </p>
                <span className="person">
                  <p className="name">فاطمة المري</p>
                  <p className="job">صاحب المشروع</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “كنت ابحث عن شركة تقوم بإعداد دراسة جدوى لمشروع مصنع هياكل
                  حديدية واخبرني اخوي بان اقوم بعمل دراسة الجدوى من خلال شركة
                  شارِك للإستشارات واستلمت دراسة جدوى للمشروع وحصلت على الموافقة
                  بدون أي تعديلات بفضل الله”
                </p>
                <span className="person">
                  <p className="name">عبد العزيز الكواري</p>
                  <p className="job">رائد اعمال</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “كانت شركة شارِك للإستشارات سببا في تغيير مستقبلي حيث قمت من
                  خلالهم بطلب خدمة دراسة جدوى وبالفعل حصلت على دراسة الجدوى
                  للمشروع وبالفعل كانت النتائج الحمد لله مرضية”
                </p>
                <span className="person">
                  <p className="name">احمد المعاضيد</p>
                  <p className="job">رائد اعمال</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “ما نستطيع قوله بشأن ادارة شركة شارِك في اختيار فريق عمل
                  متكامل حقق لي العديد من الخدمات والإستشارات وعدد ٢ دراسة جدوى
                  لمشروعات خاصة بي حقا ما يميز هذه الشركة هو قدرتهم على الادارة
                  المتميزة التي حققت المعادلة بين الأسعار المناسبة والجودة
                  المطلوبة. شكرا لكم”
                </p>
                <span className="person">
                  <p className="name">محمد الهاجري</p>
                  <p className="job">رجل أعمال</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “ان صدق التعامل في الوقت والدقة للمشروع الذي قمت بإعداد دراسة
                  جدوى لدى شركة شارِك للإستشارات هو ما جعلني استمر معهم في
                  العديد من الإستشارات الاخرى لمشاريعي”
                </p>
                <span className="person">
                  <p className="name">ناصر الدوسري</p>
                  <p className="job">رجل أعمال</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="paperwork">
        <img src={paperwork} alt="" />
        <AnimatedContent threshold={0.3} delay={0.2} duration={1.2}>
          <h2>نعرض عليكم اكثر الاسئلة شيوعاً من عملائنا الكرام</h2>
        </AnimatedContent>
      </div>
      <div className="commonQuestion">
        {aboutCards.map((about, index) => (
          <motion.div
            className="text"
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div
              className={`question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleAnswer(index)}
            >
              <h4>{about.question}</h4>
              <span
                style={{
                  transform:
                    openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {arrowDown}
              </span>
            </div>
            <div className={`answer ${openIndex === index ? "open" : ""}`}>
              <div>
                <p>{about.answer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default App;
