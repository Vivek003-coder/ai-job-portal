import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import notificationService from "../../services/notificationService";

function NotificationCenter({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return undefined;
    let active = true;
    notificationService.getAll()
      .then((items) => {
        if (active) {
          setNotifications(items);
          setError("");
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || "Unable to load notifications.");
        }
      });
    return () => { active = false; };
  }, [open]);

  const markRead = async (item) => {
    if (item.read) return;
    try {
      await notificationService.markRead(item.id);
      setNotifications((current) => current.map((notification) =>
        notification.id === item.id ? { ...notification, read: true } : notification
      ));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update notification.");
    }
  };

  const markAllRead = async () => {
    try {
      await notificationService.markAllRead();
      setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update notifications.");
    }
  };

  const unread = notifications.filter((item) => !item.read).length;

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className={className}
        style={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          width: 40,
          height: 40,
          padding: 0,
          border: 0,
          borderRadius: 8,
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
        }}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Bell size={19} />
        {unread > 0 && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              minWidth: 16,
              height: 16,
              padding: "0 4px",
              borderRadius: 8,
              background: "#ef4444",
              color: "#fff",
              fontSize: 10,
              lineHeight: "16px",
            }}
          >
            {unread}
          </span>
        )}
      </button>
      {open && (
        <section
          aria-label="Notifications"
          style={{
            position: "absolute",
            zIndex: 50,
            top: "calc(100% + 10px)",
            right: 0,
            width: 320,
            maxHeight: 420,
            overflowY: "auto",
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#fff",
            boxShadow: "0 12px 30px rgba(15, 23, 42, .15)",
            color: "#0f172a",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <strong>Notifications</strong>
            {unread > 0 && (
              <button type="button" onClick={markAllRead}>Mark all read</button>
            )}
          </div>
          {error && <p role="alert">{error}</p>}
          {!error && notifications.length === 0 && (
            <p style={{ color: "#64748b" }}>You’re all caught up.</p>
          )}
          {notifications.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => markRead(item)}
              style={{
                display: "block",
                width: "100%",
                marginTop: 10,
                padding: 10,
                border: 0,
                borderRadius: 8,
                textAlign: "left",
                background: item.read ? "#fff" : "#f1f5f9",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <strong>{item.title}</strong>
              <span style={{ display: "block", marginTop: 4 }}>{item.message}</span>
              <small style={{ color: "#64748b" }}>
                {new Date(item.createdAt).toLocaleString()}
              </small>
            </button>
          ))}
        </section>
      )}
    </div>
  );
}

export default NotificationCenter;
