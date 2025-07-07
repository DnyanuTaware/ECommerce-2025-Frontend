import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartData } from "@/context/CartContext";
import { userData } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { btnLoading, loginUser, verifyUser } = userData();

  const { fetchcart } = cartData();

  const submitHandler = () => {
    console.log(otp);
    verifyUser(Number(otp), navigate, fetchcart);
  };

  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const fromatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleResendOTP = async () => {
    const email = localStorage.getItem("email");

    await loginUser(email, navigate);
    setTimer(90);
    setCanResend(false);
  };

  return (
    <div className="min-h-[60vh]">
      <Card className="md-w-[400px] sm:w-[300px] m-auto mt-5">
        <CardHeader>
          <CardTitle>Enter Your OTP</CardTitle>
          <CardDescription>
            if you dont get OTP plz Check your spam section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-x-1">
            <Label className="mb-4">Enter OTP</Label>
            <Input
              type="Number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={btnLoading} onClick={submitHandler}>
            {btnLoading ? <Loader /> : " Submit"}
          </Button>
        </CardFooter>
        <div className="flex flex-col justify-center items-center w-[200px] m-auto">
          <p className="text--lg mb-3">
            {canResend
              ? "You can Now Resend OTP"
              : `Time remaning: ${fromatTime(timer)}`}
          </p>
          <Button
            onClick={handleResendOTP}
            className="mb-3 cursor-pointer "
            disabled={!canResend}
          >
            Resend OTP
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Verify;
