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
import { userData } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");

  const { loginUser, btnLoading } = userData();
  const navigate = useNavigate();

  const submitHandler = () => {
    console.log(email);

    loginUser(email, navigate);
  };
  return (
    <div className="min-h-[60vh]">
      <Card className="md-w-[400px] sm:w-[300px] m-auto mt-5">
        <CardHeader>
          <CardTitle>Enter Your Email to get OTP</CardTitle>
          <CardDescription>
            if you already got the OTP on mail then you can directly go to opt
            tab
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-x-1">
            <Label className="mb-4">Enter Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="success"
            disabled={btnLoading}
            onClick={submitHandler}
          >
            {btnLoading ? <Loader /> : " Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
