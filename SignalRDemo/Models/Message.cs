namespace SignalRDemo.Models
{
    public class Message
    {
        public int MessageId { get; set; }

        public string MessageText { get; set; } = default!;

        public string UserName { get; set; } = default!;

        public DateTime MessageDate { get; set; } = DateTime.Now;
    }
}
