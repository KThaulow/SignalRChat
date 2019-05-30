using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChartSite.Models.HubConfig
{
	public class ChartHub : Hub
	{
		public void SendToAll(string name, string message)
		{
			Clients.All.SendAsync("sendToAll", name, message);
		}
	}
}
