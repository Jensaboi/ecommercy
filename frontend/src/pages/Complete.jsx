import React, { useState, useEffect } from "react";
import { fetchSessionStatus } from "../lib/api";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);

  const searchParmas = url.searchParams;
  const sessionId = searchParmas.get("session_id");

  try {
    const data = await fetchSessionStatus(sessionId);

    return data;
  } catch (err) {}
}

export default function Complete() {
  const data = useLoaderData();
  const [statusData, setStatusData] = useState({
    status: null,
    paymentIntentId: "",
    paymentStatus: "",
    paymentIntentStatus: "",
    iconColor: "",
    icon: null,
    text: "",
  });
  console.log("data", data);
  //console.log("statusData", statusData);

  useEffect(() => {
    const SuccessIcon = (
      <svg
        width="40"
        height="40"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z"
          fill="white"
        />
      </svg>
    );

    const ErrorIcon = (
      <svg
        width="40"
        height="40"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z"
          fill="white"
        />
      </svg>
    );

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`/api/checkout/session-status?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        const isSuccess = data.status === "complete";
        setStatusData({
          status: data.status,
          paymentIntentId: data.payment_intent_id,
          paymentStatus: data.payment_status,
          paymentIntentStatus: data.payment_intent_status,
          iconColor: isSuccess ? "#30B130" : "#DF1B41",
          icon: isSuccess ? SuccessIcon : ErrorIcon,
          text: isSuccess
            ? "Payment succeeded!"
            : "Something went wrong. Please try again.",
        });
      })
      .catch(err => {
        console.error("Failed to fetch session status:", err);
        setStatusData(prev => ({
          ...prev,
          iconColor: "#DF1B41",
          text: "Unable to retrieve payment status.",
          icon: ErrorIcon,
        }));
      });
  }, []);

  const {
    status,
    paymentIntentId,
    paymentStatus,
    paymentIntentStatus,
    iconColor,
    icon,
    text,
  } = statusData;

  return (
    <div
      className="border"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {icon}
      </div>
      <h2 style={{ marginBottom: "2rem", color: "#333" }}>{text}</h2>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          maxWidth: "500px",
          marginBottom: "2rem",
        }}
      >
        <tbody>
          <tr>
            <td style={tableLabelStyle}>Payment Intent ID</td>
            <td style={tableContentStyle}>{paymentIntentId}</td>
          </tr>
          <tr>
            <td style={tableLabelStyle}>Status</td>
            <td style={tableContentStyle}>{status}</td>
          </tr>
          <tr>
            <td style={tableLabelStyle}>Payment Status</td>
            <td style={tableContentStyle}>{paymentStatus}</td>
          </tr>
          <tr>
            <td style={tableLabelStyle}>Payment Intent Status</td>
            <td style={tableContentStyle}>{paymentIntentStatus}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: "flex", gap: "1rem" }}>
        <a
          href={`https://dashboard.stripe.com/payments/${paymentIntentId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          View Details
        </a>
        <a href="/checkout" style={retryButtonStyle}>
          Test Another
        </a>
      </div>
    </div>
  );
}

// Custom inline styles
const tableLabelStyle = {
  padding: "0.5rem 1rem",
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
};

const tableContentStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#fff",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#0055DE",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
};

const retryButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#DF1B41",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
};
