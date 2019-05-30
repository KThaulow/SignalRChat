using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChatSite.Models.Chat
{
	public class ReceiverChatMessage
	{
		public string Sender { get; set; }
		public string Receiver { get; set; }
		public string Message { get; set; }
		public DateTime TimeStamp { get; set; }
	}
}
