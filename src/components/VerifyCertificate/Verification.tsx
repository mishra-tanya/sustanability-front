import { Box, Button, Card, TextField, Typography } from "@mui/material";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";   
import api from "../../services/axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Verification = () => {
    const { certificateId: paramCertificateId } = useParams();  
    const [certificationId, setCertificationId] = useState(paramCertificateId || "");  
    const [loading, setLoading] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<"verified" | "notVerified" | null>(null);
    const [verificationData, setVerificationData] = useState<any>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        if (paramCertificateId) {
            handleVerification(paramCertificateId); 
        }
    }, [paramCertificateId]); 

    const handleVerification = async (id: string) => {
        setLoading(true);
        setVerificationStatus(null);
        setShowAnimation(false);
        try {
            const response = await api.post(`/certificateVerification/${id}`);
            // console.log(response.data);
            if (response.data && response.data.verified === true) {
                setVerificationStatus("verified");
                setVerificationData(response.data);
            } else {
                setVerificationStatus("notVerified");
                setVerificationData(null);
            }
        } catch (error) {
            console.log("Error fetching data:" + error);
            setVerificationStatus("notVerified");
        } finally {
            setShowAnimation(true);
            setTimeout(() => {
                setShowAnimation(false);
            }, 4000);
            setLoading(false);
        }
    };

    const handleButtonClick = () => {
        if (certificationId) {
            handleVerification(certificationId); 
        }
    };

    return (
        <div>
            <Navbar />

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 6 }}>
                <TypeAnimation
                    sequence={[
                        "Welcome to Sustainability Olympiad",
                        2000,
                        
                        " Certificate Verification",
                        2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: "20px", display: "inline-block", fontWeight: "bold" }}
                    repeat={2}
                />
            </Box>

            <Box sx={{ display: "flex", mt:3,alignItems: "center", justifyContent: "center", height: "10vh", width: "100vw" }}>
                <TextField
                    label="Certification Verification Number"
                    id="filled-hidden-label-small"
                    variant="filled"
                    sx={{ width: "300px" }}
                    value={certificationId}
                    onChange={(e) => setCertificationId(e.target.value)}
                />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",mt:3,mb:3 }}>
                <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={loading}>
                    {loading ? "Please Wait Verifying..." : "Verify Certificate"}
                </Button>
            </Box>

            {showAnimation && (
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: "fadeOut 4s ease",
                        "@keyframes fadeOut": {
                            "0%": { opacity: 1 },
                            "100%": { opacity: 0 },
                        },
                    }}
                >
                    {verificationStatus === "verified" ? (
                        <Box sx={{ background: "white", p: 10 }}>
                            <CheckCircleOutlineIcon sx={{ fontSize: "300px", color: "green", animation: "zoomIn 0.5s ease" }} />
                        </Box>
                    ) : (
                        <Box sx={{ background: "white", p: 10 }}>
                            <CancelOutlinedIcon sx={{ fontSize: "300px", color: "red", animation: "zoomIn 0.5s ease" }} />
                        </Box>
                    )}
                </Box>
            )}

            {verificationStatus === "notVerified" && (
                <Typography sx={{ mt: 2, color: "red", textAlign: "center" }}>Certificate is Not Verified!</Typography>
            )}

            {verificationStatus === "verified" && verificationData && (
               <>
                <Box sx={{ mt: 2, textAlign: "center" }}>
                   
                      </Box>
                     <Box sx={{display:"flex",flexDirection:'column',alignItems:"center",justifyContent:"center",p:4}}>
                     <Card variant="outlined" sx={{p:5}}>
                     <Typography variant="h5" sx={{ mb: 1, color:'green' ,textAlign:'center'}}>
                       <b> Certificate Verified!</b>
                    </Typography>
                    <hr />
                      <Typography variant="body1"><b>Name: </b>{verificationData.name}</Typography>
                      <Typography variant="body1"><b>School: </b>{verificationData.school}</Typography>

                    <Typography variant="body1"><b>Certification Date:</b> {verificationData.date}</Typography>
                    <Typography variant="body1"><b>Certification Level:</b> Class {verificationData.classGroup}</Typography>
                    </Card>
             
                      </Box>
               </>
            )}

            <Footer />
        </div>
    );
};

export default Verification;
