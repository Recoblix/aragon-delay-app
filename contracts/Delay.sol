pragma solidity ^0.4.4;

import "@aragon/os/contracts/apps/AragonApp.sol";


contract Delay is AragonApp {
	uint256 public delay;

  struct Action {
      address creator;
      uint256 activeBlock;
      bytes executionScript;
      bool executed;
      bool canceled;
  }

  Action[] public actions;

  event StartAction(uint256 indexed actionId);
  event ExecuteAction(uint256 indexed actionId);

  bytes32 constant public INITIATE_ROLE = keccak256("INITIATE_ROLE");
  bytes32 constant public ACTIVATE_ROLE = keccak256("ACTIVATE_ROLE");
  bytes32 constant public CANCEL_ROLE = keccak256("CANCEL_ROLE");

	function initialize(
			uint256 _delay
			) onlyInit
	{
		initialized();
		delay = _delay;
	}

  /**
  * @notice Execute the result of action #`_actionId`
  * @param _actionId Id for action
  */
  function activate(uint256 _actionId) auth(ACTIVATE_ROLE) public {
      Action storage action = actions[_actionId];
			require(action.executed == false);
			require(action.canceled == false);
			require(action.activeBlock < getBlockNumber());

			action.executed = true;

      bytes memory input = new bytes(0); // TODO: Consider input for voting scripts
      runScript(action.executionScript, input, new address[](0));

      emit ExecuteAction(_actionId);
  }

  /**
  * @notice Cancel the action #`_actionId`
  * @param _actionId Id for action
  */
  function cancel(uint256 _actionId) auth(CANCEL_ROLE) public {
      Action storage action = actions[_actionId];
			require(action.executed == false);
			require(action.canceled == false);
			action.canceled = true;
	}

  /**
  * @notice Requests to perform the action after the delay
  * @dev IForwarder interface conformance
  * @param _evmScript Script to run
  */
  function forward(bytes _evmScript) auth(INITIATE_ROLE) public {
      uint256 actionId = actions.length++;
      Action storage action = actions[actionId];
      action.executionScript = _evmScript;
      action.activeBlock = getBlockNumber() + delay;

      emit StartAction(actionId);
  }

  function isForwarder() public pure returns (bool) {
      return true;
  }

  function canForward(address _sender, bytes _evmCallScript) public view returns (bool) {
      return canPerform(_sender, INITIATE_ROLE, arr());
  }

}
