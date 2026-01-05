"use client";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth, db } from "@/storage/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  limit,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [area, setArea] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;
    const usersRef = collection(db, "users");
    async function fetchUser() {
      setLoading(true);
      try {
        const userRef = doc(usersRef, user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) setUserInfo(snap.data());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [user]);

  useEffect(() => {
    const doctorsRef = collection(db, "doctors");
    async function fetchDoctors() {
      setLoading(true);
      setError("");
      try {
        const filters = [];
        if (area) filters.push(where("area", "==", area));
        if (specialty) filters.push(where("specialty", "==", specialty));
        const q =
          filters.length > 0
            ? query(doctorsRef, ...filters)
            : query(doctorsRef, limit(50));
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setDoctors(list);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [area, specialty]);

  async function handleSignOut() {
    await signOut(auth);
    router.push("/");
  }

  function resetFilters() {
    setArea("");
    setSpecialty("");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="self-center md:self-auto"
        >
          <Link href="/" className="text-2xl font-semibold">
            Aswan-Med
          </Link>
        </motion.div>
        <div className="flex items-center gap-4 animate-fade-in w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-sm md:text-lg">
              {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="text-xs md:text-sm text-slate-700 truncate">
                {userInfo?.name || "User"}
              </div>
              <div className="text-[11px] md:text-xs text-slate-500 truncate">
                {user?.email}
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="px-2 py-1 md:px-3 md:py-2 rounded-xl bg-red-600 text-white text-sm md:text-md cursor-pointer hover:bg-red-700 transition-colors"
          >
            Sign Out
          </motion.button>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold animate-fade-in">
            Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-600 animate-fade-in">
            Find available doctors in your area
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <motion.select
            whileHover={{ scale: 1.02 }}
            whileFocus={{ borderColor: "#4346f1ff" }}
            className=" rounded-xl p-2 border border-gray-400 cursor-pointer w-full md:w-64 outline-none font-normal"
            onChange={(e) => setArea(e.target.value)}
            value={area}
          >
            <option value="">All Cities</option>
            <option value="Komombo">Komombo</option>
            <option value="Aswan">Aswan</option>
            <option value="Daraw">Daraw</option>
          </motion.select>

          <motion.select
            whileHover={{ scale: 1.02 }}
            whileFocus={{ borderColor: "#4346f1ff " }}
            className="border border-gray-400 cursor-pointer outline-none font-normal p-2 rounded-xl w-full md:w-64"
            onChange={(e) => setSpecialty(e.target.value)}
            value={specialty}
          >
            <option value="">All Specialities</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Gynecology"> Gynecology</option>
            <option value="Orhtopedics"> Orthopedics</option>
            <option value="Surgery"> Surgery </option>
            <option value="Urology"> Urology </option>
            <option value="Pulmonology"> Pulmonology </option>
            <option value="ENT"> ENT </option>
            <option value="Neurology"> Neurology</option>
            <option value="General Medicine"> General Medicine </option>
          </motion.select>

          <div className="ml-auto flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetFilters}
              className="px-5 py-1 bg-transparent border border-gray-300 text-gray-500 rounded-xl cursor-pointer hover:border-gray-400 transition-colors hover:text-gray-700"
            >
              Reset
            </motion.button>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl p-4 bg-white shadow animate-fade-in"
              >
                <div className="flex items-center gap-4">
                  <div className="skeleton w-14 h-14 rounded-full" />
                  <div className="flex-1">
                    <div className="skeleton h-4 w-3/4 mb-2 rounded" />
                    <div className="skeleton h-3 w-1/2 rounded" />
                  </div>
                </div>
                <div className="mt-3 skeleton w-full rounded-xl aspect-[16/9] min-h-[120px] md:min-h-[140px]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-50 text-rose-700 rounded">{error}</div>
        ) : doctors.length === 0 ? (
          <div className="p-6 bg-yellow-50 rounded text-slate-700">
            No doctors found. Try different filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function DoctorCard({ doctor, index = 0 }) {
  const specialtyPhotos = {
    Cardiology: "/cardiology.jpg",
    Dermatology: "/Derma.png",
    Gynecology: "/Gyna.png",
    Orthopedics: "/Ortho.png",
    Pediatrics: "/Pedia.png",
    Surgery: "/Surgery.png",
    Urology: "/Uro.png",
    Pulmonology: "/Chest.png",
    ENT: "/ENT.png",
    Neurology: "/Neuro.png",
    "General Medicine": "/Gp.png",
    "Internal Medicine": "/Internal.png",
  };
  const photos = specialtyPhotos[doctor?.specialty] || "/default.jpg";
  const phone = doctor?.contact || "";
  const mapsUrl = doctor?.location || "";

  return (
    <div
      style={{ animationDelay: `${index * 70}ms` }}
      className="group opacity-0 animate-fade-up bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center font-semibold text-lg">
          {doctor.name ? doctor.name.charAt(0).toUpperCase() : "D"}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{doctor.name}</h3>
          <p className="text-sm text-slate-500">{doctor.specialty}</p>
        </div>
        <div className="ml-auto text-sm text-slate-400">
          {doctor.area || ""}
        </div>
      </div>

      <div className="w-full relative overflow-hidden rounded-xl bg-slate-100 aspect-[16/9] min-h-[120px] md:min-h-[140px]">
        <Image
          src={photos}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          alt={`${doctor.specialty} photo`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 text-white text-sm drop-shadow-md">
          <div className="font-semibold">{doctor.name}</div>
          <div className="text-xs opacity-90">{doctor.specialty}</div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        {doctor.address ? (
          <p className="text-sm text-gray-400">Address: {doctor.address}</p>
        ) : (
          <p className="text-md text-gray-400">
            We are sorry but there is no available address for this doctor yet
          </p>
        )}
        {doctor.pharmacy && (
          <p className="text-sm text-gray-400">
            Closest pharmacy: {doctor.pharmacy} Pharmacy
          </p>
        )}
        {doctor.arrivalTime && (
          <p className="text-sm text-gray-400"> {doctor.arrivalTime} </p>
        )}

        <div className="mt-3 flex gap-3">
          {phone && (
            <Link
              href={`tel:${phone}`}
              className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-xl shadow-sm hover:bg-[var(--primary-dark)]"
            >
              Call
            </Link>
          )}
          {mapsUrl && (
            <Link
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border rounded-xl text-slate-700 hover:bg-slate-50 transition"
            >
              View on maps
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
