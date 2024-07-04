// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract YourContract is Ownable {

    uint256 public id;

    struct Ticket {
        string flightCode;
        uint256 id;
        string from;
        string to;
        string date;
        uint256 price;
        uint256 seat;
        uint256 availableSeats;
        bool[] seats;
        mapping(address => bool) isCheckIn;
		mapping(address => bool) isItSold;
		mapping(address => uint256) ownerSeat;
    }

    Ticket[] public tickets;

	event buyTicketEvent(string _flightCode,uint256 _ticketId , string _from, string _to, string _date, uint256 _price, uint256 _seat, address _user, uint256 _luggageWeight);
	event checkInEvent(string _flightCode,uint256 _ticketId , string _from, string _to, string _date, uint256 _price, uint256 _seatNumber, address _user, uint256 _luggageWeight);
    event createTicketEvent(string _flightCode,uint256 _ticketId , string _from, string _to, string _date, uint256 _price, uint256 _seat);
    

    

    function createTicket( //koltuk sayısı az olacak
        string memory _flightCode,
        string memory _from,
        string memory _to,
        string memory _date,
        uint256 _price,
        uint256 _seat
    ) public onlyOwner {
        uint256 _availableSeats = _seat;

        bool[] memory _array = new bool[](_seat);

       
        tickets.push();

        Ticket storage newTicket = tickets[tickets.length - 1];
        newTicket.flightCode = _flightCode;
        id = tickets.length-1;
        newTicket.id = id;
        newTicket.from = _from;
        newTicket.to = _to;
        newTicket.date = _date;
        newTicket.price = _price;
        newTicket.seat = _seat;
        newTicket.availableSeats = _availableSeats;
        newTicket.seats = _array;

        emit createTicketEvent(_flightCode, id, _from, _to, _date, _price, _seat);
        

        
    }

	function getSeatMap(uint256 _ticketId) public view returns (bool[] memory) {
		return tickets[_ticketId].seats;
	}

	function isCheckedIn(uint256 _ticketId, address _user) public view returns (bool) {
		return tickets[_ticketId].isCheckIn[_user];
	}


	function buyTicket(uint256 _ticketId) public payable {
		require(tickets[_ticketId].availableSeats > 0, "No available seats");
		require(msg.value >= tickets[_ticketId].price, "Insufficient funds");
		require(!tickets[_ticketId].isItSold[msg.sender], "Already bought a ticket");
        uint256 luggageWeight = 10;

        if(msg.value >= tickets[_ticketId].price/100*110){
            luggageWeight = 20;}

		tickets[_ticketId].availableSeats--;
		tickets[_ticketId].isItSold[msg.sender] = true;

        emit buyTicketEvent(tickets[_ticketId].flightCode, tickets[_ticketId].id, tickets[_ticketId].from, tickets[_ticketId].to, tickets[_ticketId].date, tickets[_ticketId].price, tickets[_ticketId].seat, msg.sender, luggageWeight);
		
	}

	function checkIn(uint256 _ticketId, uint256 _seat) public {
		require(tickets[_ticketId].isItSold[msg.sender], "You have not bought a ticket");
		require(!tickets[_ticketId].isCheckIn[msg.sender], "You have already checked in");
		require(!tickets[_ticketId].seats[_seat], "Seat is not available");


		tickets[_ticketId].seats[_seat] = true;
		tickets[_ticketId].isCheckIn[msg.sender] = true;
		tickets[_ticketId].ownerSeat[msg.sender] = _seat;

        emit checkInEvent(tickets[_ticketId].flightCode, tickets[_ticketId].id, tickets[_ticketId].from, tickets[_ticketId].to, tickets[_ticketId].date, tickets[_ticketId].price, _seat, msg.sender, 12);
		
	}

    function withdraw() public onlyOwner{
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, ) = address(msg.sender).call{value: address(this).balance }("");
        require(sent, "Failed to send Ether");
    }

	





	
}
